<template>
  <div>
    <pre>{{ text }}</pre>
    <prompt label="login as:" @newLine="loginAs"/>
    <div v-for="line in lines">
      <prompt v-if="line.type === 'prompt'" :label="line.label" @newLine="password"/>
      <pre v-else>{{line.label}}</pre>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Prompt from './Prompt.vue';
  import Component from 'vue-class-component';
  import { LineType } from '../../types';

  interface Line {
    label: string;
    type: string;
  }

  @Component({
    components: { Prompt },
  })
  export default class Login extends Vue {
    public text: string = `Welcome !`;
    public username: string | undefined = '';
    public lines: Line[] = [];
    public numberOfTriesLeft: number = 3;

    public loginAs({ command }: LineType) {
      this.username = command;
      console.log('typed login', command);
      this.lines.push({ label: 'password :', type: 'prompt' });
    }

    public password({ command }: LineType) {
      console.log('typed password', command);
      if (command === '42') {
        this.lines.push({ label: `bravo ${this.username}`, type: 'info' });
        this.$emit('newLine', { command: 'loggedIn', username: this.username });
      } else {
        this.numberOfTriesLeft--;
        if (this.numberOfTriesLeft <= 0) {
          this.$emit('newLine', { command: './virus.sh' });
        } else {
          this.lines.push({ label: `Wrong password, you only have ${this.numberOfTriesLeft} tries left`, type: 'info' });
          this.lines.push({ label: 'password :', type: 'prompt' });
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../variables';

  pre {
    font-family: $term-font;
    margin: 0;
  }
</style>
