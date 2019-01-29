<template>
  <div>
    <pre>Hello {{username}}</pre>

    <div v-for="line in lines">
      <prompt
        :label="line.label + ':'"
        @newLine="respond"
        :events="events">
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
      label: 'Je viens à la Mairie [Y/n]',
      type: 'boolean',
      field: 'cityhall',
    }, {
      label: 'Test',
      type: 'number',
      field: 'test',
    }, {
      label: 'Test 2',
      type: 'number',
      field: 'test2',
    }];

    public lines: Question[] = [];
    public current = 0;

    private answers: Question[] = [];


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

    submit(answers: Question[]) {
      console.log('answsers', JSON.stringify(answers));

      this.$emit('exit', 0);
    }
  }
</script>

<style scoped>

</style>
