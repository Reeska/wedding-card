<template>
  <div>
    <div v-if="result">{{result}}</div>
    <div v-if="resultAsComponent">
      <component
        :is="resultAsComponent"
        :options="options"
        :events="events"
        :username="username"
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
  import { Observable } from 'rxjs';

  import { OnCreated } from '../types';
  import Ls from './commands/Ls.vue';
  import Bash from './commands/Bash.vue';
  import Virus from './commands/Virus.vue';
  import Login from './commands/Login.vue';

  @Component({
    components: { Bash, Ls, Virus, Login },
  })
  export default class Command extends Vue implements OnCreated {
    @Prop()
    public command?: string;

    @Prop()
    public events?: Observable<Event>;

    @Prop()
    public username: string | undefined;

    private result: string = '';
    private resultAsComponent: string = '';
    private options: string[] = [];

    public created() {
      if (!this.command) {
        this.exit(1);
        return;
      }

      const [command, parameters] = this.command.trim().split(' ');

      switch (command) {
        case 'bash':
          this.resultAsComponent = 'bash';
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
        case 'login':
          this.resultAsComponent = 'login';
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
