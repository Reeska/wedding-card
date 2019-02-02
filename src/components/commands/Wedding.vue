<template>
  <div>
    <pre>Hello {{username}}</pre>
    <div v-for="line in lines">
      <prompt
        :label="line.label + ':'"
        @newLine="respond"
        :events="events"
        @keyup="keyup"
        @keydown="keydown">
      </prompt>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { Observable } from 'rxjs';

  import { CONTROL_KEYS, C_KEY_CODE } from '../../services/constantes';
  import { database } from '../../services/firebase';

  import { LineType, OnCreated } from '../../types';
  import Prompt from './Prompt.vue';
  import { functions } from 'firebase';

  type QuestionType = 'boolean' | 'number';

  interface Question {
    label: string;
    type: QuestionType;
    field: string;
    answer?: any;
    showIf?: () => boolean;
  }

  @Component({
    components: { Prompt },
  })
  export default class Wedding extends Vue implements OnCreated {
    @Prop()
    public events?: Observable<Event>;

    @Prop()
    public username?: string;

    visitorsRef = database.collection('visitors');

    public questions: Question[] = [
      {
        label: 'Est-ce que tu viens à la mairie ? [Y/n]',
        type: 'boolean',
        field: 'cityhall',
      },
      {
        label: 'Tu viens accompagné de combien de personne à la mairie ? ',
        type: 'number',
        field: 'cityhall_companions',
        showIf: () => this.getAnswerForField('cityhall'),
      },
      {
        label:
          'On voudrait organiser un petit jeu de piste à côté de la mairie en attendant de pouvoir ' +
          'aller aux poules, ça te tenterait ? [Y/n]',
        type: 'boolean',
        field: 'scavenger_hunt',
      },
      {
        label: `Et du coup tu viendrais accompagné de combien de personne pour l'activité ? `,
        type: 'number',
        field: 'scavenger_hunt_companions',
        showIf: () => this.getAnswerForField('scavenger_hunt'),
      },
      {
        label: `Est-ce que tu viens aux p'tites poules ? [Y/n]`,
        type: 'boolean',
        field: 'bar',
      },
      {
        label: 'Tu viens accompagné de combien de personne au bar ? ',
        type: 'number',
        field: 'bar_companions',
        showIf: () => this.getAnswerForField('bar'),
      },
    ];

    public lines: Question[] = [];
    public current = 0;

    private answers: Question[] = [];
    private ctrlDown: boolean = false;

    created() {
      this.appendNextQuestion();
    }

    respond({ command }: LineType) {
      const question = this.getCurrentQuestion();

      if (this.isValid(question, command)) {
        this.answers.push({ ...question, answer: this.normalize(question, command) });
        this.current++;
      }

      const futureQuestion = this.getCurrentQuestion();
      if (futureQuestion && futureQuestion.showIf && !futureQuestion.showIf()) {
        this.current++;
      }

      if (this.current >= this.questions.length) {
        this.submit(this.answers);
        return;
      }

      this.appendNextQuestion();
    }

    getCurrentQuestion(): Question {
      return this.questions[this.current];
    }

    appendNextQuestion() {
      this.lines.push(this.getCurrentQuestion());
    }

    isValid(question: Question, answer: string | undefined): boolean {
      switch (question.type) {
        case 'boolean':
          return answer === 'Y' || answer === 'y' || answer === 'n' || !answer;
        case 'number':
          return !!answer && !isNaN(+answer);
        default:
          return false;
      }
    }

    normalize(question: Question, answer: string | undefined): any {
      switch (question.type) {
        case 'boolean':
          if (answer === 'Y' || answer === 'y' || !answer) {
            return true;
          }
          return false;
        case 'number':
          return answer && +answer;
        default:
          return answer;
      }
    }

    getAnswerForField(field: string) {
      return (this.answers.find(answer => answer.field === field) || { answer: null }).answer;
    }

    async submit(answers: Question[]) {
      try {
        await this.visitorsRef.add({
          firstname: this.username,
          cityhall: this.getAnswerForField('cityhall'),
          cityhall_companions: this.getAnswerForField('cityhall_companions'),
          scavenger_hunt: this.getAnswerForField('scavenger_hunt'),
          scavenger_hunt_companions: this.getAnswerForField('scavenger_hunt_companions'),
          bar: this.getAnswerForField('bar'),
          bar_companions: this.getAnswerForField('bar_companions'),
        });
      } catch (error) {
        console.log('error', error);
      }
      this.$emit('exit', 0);
    }

    keyup($event: KeyboardEvent) {
      if (CONTROL_KEYS.includes($event.keyCode)) {
        this.ctrlDown = false;
      }
    }

    keydown($event: KeyboardEvent) {
      if (CONTROL_KEYS.includes($event.keyCode)) {
        this.ctrlDown = true;
      }
      if (this.ctrlDown && $event.keyCode === C_KEY_CODE) {
        this.$emit('exit', 0);
      }
    }
  }
</script>

<style scoped>
</style>
