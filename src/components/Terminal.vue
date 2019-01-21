<template>
  <div>
    <div class="header">
      {{username}}@ubuntu-VirtualBox: ~/sfk
    </div>
    <div class="bash" @click="promptFocus">
      <div v-for="line in lines" :key="line.key" class="line">
        <command
          :command="line.command"
          :extra="line.extra"
          :username="username"
          @clear="handleClear"
          @newLine="newLine"
          @exit="restart"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Command from './Command.vue';
  import Component from 'vue-class-component';
  import { Line, LineType, OnCreated } from '../types';

  @Component({
    components: {
      Command,
    },
  })
  export default class Terminal extends Vue implements OnCreated {
    current: Line | null = null;
    lines: Line[] = [];
    username: string | undefined = '';

    public created() {
      this.bash();
    }

    public promptFocus() {
      if (this.current) {
        this.current.extra.focus = new Date().getTime();
      }
    }

    public restart() {
      this.lines = [];
      this.login();
    }

    public handleClear() {
      this.lines = [];
      this.bash();
    }

    private newLine(mode: LineType) {
      const timestamp = new Date().getTime();
      const line: Line = {
        ...mode,
        key: timestamp + this.lines.length,
        extra: {
          focus: timestamp,
        },
      };

      if (mode.command === 'loggedIn') {
        this.handleClear();
        this.username = mode.username;
      } else {
        this.lines.push(line);
        this.current = line;
      }
    }

    private cmd(command: string) {
      this.newLine({ mode: 'command', command });
    }

    private bash() {
      this.cmd('bash');
    }

    private login() {
      this.cmd('login');
    }
  }
</script>

<style lang="scss" scoped>
  @import '../variables';

  .header {
    background: #300924 url('../assets/ubuntu_bash_header.png') no-repeat top center;
    height: 28px;
    width: 100%;
    max-width: 700px;
    margin: auto;
    border-radius: 7px 7px 0 0;
    font-family: Ubuntu, serif;
    font-size: 14px;
    line-height: 29px;
    color: #d4d9cd;
    text-align: left;
    text-indent: 74px;
  }

  .bash {
    background-color: #300924;
    height: 300px;
    width: 100%;
    max-width: 700px;
    margin: auto;
    font-family: $term-font;
    color: white;
    text-align: left;
    overflow: scroll;
    position: relative;

    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
