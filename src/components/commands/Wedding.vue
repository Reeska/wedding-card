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

  import { LineType, OnCreated } from '../../types';
  import Prompt from './Prompt.vue';

  type QuestionType = 'boolean' | 'number';

  interface Question {
    label: string;
    type: QuestionType;
    field: string;
    answer?: any;
  }

  @Component({
    components: { Prompt },
  })
  export default class Wedding extends Vue implements OnCreated {
    @Prop()
    public events?: Observable<Event>;

    @Prop()
    public username?: string;

    public questions: Question[] = [{
      label: 'Est-ce que tu viens à la mairie ? [Y/n]',
      type: 'boolean',
      field: 'cityhall',
    }, {
      label: 'Tu viens accompagné de combien de personne à la mairie ? ',
      type: 'number',
      field: 'cityhall_companions',
      showIf: () => { return this.getAnswerForField('cityhall'); },
    }, {
      label: 'Est-ce que tu viens aux p\'tites poules ? [Y/n]',
      type: 'boolean',
      field: 'bar',
    }, {
      label: 'Tu viens accompagné de combien de personne au bar ? ',
      type: 'number',
      field: 'bar_companions',
      showIf: () => { return this.getAnswerForField('bar'); },
    }];

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
      const futureQuestion = this.getCurrentQuestion();
      if (futureQuestion && futureQuestion.showIf && !futureQuestion.showIf()) {
        this.current++;
      }
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
      console.log('normalize: question', question, answer);
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
      return this.answers.find(answer => answer.field === field).answer;
    }

    submit(answers: Question[]) {
      console.log('answsers', JSON.stringify(answers));
      this.$emit('exit', 0);
    }

    keyup($event: KeyboardEvent) {
      if ([17, 91].includes($event.keyCode)) {
        this.ctrlDown = false;
      }
    }

    keydown($event: KeyboardEvent) {
      if ([17, 91].includes($event.keyCode)) {
        this.ctrlDown = true;
      }
      if (this.ctrlDown && $event.keyCode === 67) {
        this.$emit('exit', 0);
      }
    }
  }
</script>

<style scoped>

</style>
