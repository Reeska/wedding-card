<template>
  <div>
    <div v-if="result">{{result}}</div>
    <div v-if="resultAsComponent">
      <component
        :is="resultAsComponent"
        :options="options"
        :extra="extra"
        @newLine="newLine"
        @exit="exit">
      </component>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';

  import Ls from './commands/Ls.vue';
  import Prompt from './commands/Prompt.vue';
  import Virus from './commands/Virus.vue';
  import { OnCreated } from '../types';

  @Component({
    components: {  Prompt, Ls, Virus },
  })
  export default class Command extends Vue implements OnCreated {
    @Prop()
    public command?: string;

    @Prop()
    public extra: any;

    private result: string = '';
    private resultAsComponent: string = '';
    private options: string[] = [];

    public created() {
      if (!this.command) {
        this.exit(1);
        return;
      }

      const asArray = this.command.trim().split(' ');
      const command = asArray[0];
      const parameters = asArray[1];
      switch (command) {
        case 'bash':
          this.resultAsComponent = 'prompt';
          break;
        case 'll':
          this.options.push('l');
        case 'ls':
          if (parameters) {
            const optionsAsArray = parameters.split('-')[1].split('');
            this.options.push.apply(this.options, optionsAsArray);
          }
          this.resultAsComponent = 'ls';
          break;
        case 'clear':
          this.$emit('clear');
          break;
        case './mariage.sh':
        case 'sh mariage.sh':
          this.result = 'bienvenue !';
          this.exit(0);
          break;
        case './virus.sh':
        case 'sh virus.sh':
          this.resultAsComponent = 'virus';
          break;
        default:
          this.result = `-bash: ${this.command}: command not found`;
          this.exit(1);
      }
    }

    public newLine($event: any) {
      this.$emit('newLine', $event);
    }

    public exit($event: any) {
      this.$emit('exit', $event);
    }
  }
</script>

<style lang="scss" scoped>
</style>
