<template>
  <div>
    <pre>{{ text }}</pre>

    <div v-for="line in lines">
      <prompt
        v-if="line.type === 'login'"
        label="login as:"
        @newLine="loginAs"
        :events="events"/>
      <prompt
        v-if="line.type === 'password'"
        label="password:"
        :events="events"
        @newLine="password"/>
      <pre v-else>{{line.label}}</pre>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Prompt from './Prompt.vue';
  import Component from 'vue-class-component';
  import { LineType, OnCreated } from '../../types';
  import { Observable } from 'rxjs';
  import { Prop } from 'vue-property-decorator';

  interface Line {
    label?: string;
    type: string;
  }

  @Component({
    components: { Prompt },
  })
  export default class Login extends Vue implements OnCreated {
    public text: string = `Welcome !`;
    public username: string | undefined = '';
    public lines: Line[] = [];
    public numberOfTriesLeft: number = 3;

    @Prop()
    public events?: Observable<Event>;

    created() {
      this.displayLogin();
    }

    public loginAs({ command }: LineType) {
      const login = command && command.trim();

      if (!login) {
        this.displayLogin();
      } else {
        this.username = command;
        this.displayPassword();
      }
    }

    public password({ command }: LineType) {
      if (command === '42') {
        this.displayInfo(`bravo ${this.username}`);
        this.$emit('newLine', { command: 'loggedIn', username: this.username });
      } else {
        this.numberOfTriesLeft--;

        if (this.numberOfTriesLeft <= 0) {
          this.$emit('newLine', { command: './virus.sh' });
        } else {
          this.displayInfo(`Wrong password, you only have ${this.numberOfTriesLeft} tries left`);
          this.displayPassword();
        }
      }
    }

    displayLogin(): void {
      this.lines.push({ type: 'login' });
    }

    displayPassword(): void {
      this.lines.push({ type: 'password' });
    }

    displayInfo(label: string): void {
      this.lines.push({
        label,
        type: 'info',
      });
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
