<template>
  <div>
    <div class="header"></div>
    <div class="bash" :class="blueScreen ? 'blueScreen' : ''" @click="promptFocus">
      <div v-for="line in lines" :key="line.key" class="line">
        <div v-if="line.mode === 'prompt'">
          <div class="prompt no-style"
               spellcheck="false"
               :contenteditable="line.editable"
               @keydown="keypress"
               @keypress.enter="enter"
               @mousedown="click">
            <span>
              <span class="ubuntu-green bold">thomas@thomas</span>:
              <span class="ubuntu-blue bold">~/</span>
            </span>
            <span class="zone">&nbsp;</span>
          </div>
        </div>
        <div v-else>
          <command :command="line.command"
                   @virus="handleVirus"
                   @clear="handleClear"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Command from './Command.vue';
  import Component from 'vue-class-component';

  function preventAndStopPropagation($event: Event) {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    return false;
  }

  interface LineType {
    mode?: string;
    command?: string;
  }

  interface Line extends LineType {
    key: number;
    editable: boolean;
  }

  @Component({
    components: {
      Command,
    },
  })
  export default class Terminal extends Vue {
    current: Line | null = null;
    lines: Line[] = [];
    history: string[] = [];
    historyPosition = 0;
    lastCaretPosition = 1;
    blueScreen = false;

    created() {
      this.newLine();
    }


    input() {
      return document.querySelector('.line:last-child .zone');
    }

    keypress($event: KeyboardEvent) {
      if (this.blueScreen) {
        this.blueScreen = false;
        return preventAndStopPropagation($event);
      }

      const input = this.input();

      if ($event.key === 'ArrowUp') {
        if (input && this.history && this.historyPosition > 0) {
          this.historyPosition--;
          input.textContent = this.history[this.historyPosition];
          this.lastCaretPosition = (input.textContent || '').length;
          this.moveCursor();
          return;
        }
      }

      if ($event.key === 'ArrowDown') {
        if (input && this.history && this.historyPosition < this.history.length) {
          this.historyPosition++;
          console.log(this.historyPosition, this.history[this.historyPosition]);
          input.innerHTML = this.history[this.historyPosition] || '&nbsp;';
          this.lastCaretPosition = (input.textContent || '').length;
          this.moveCursor();
          return;
        }
      }

      const caretPosition = window.getSelection().getRangeAt(0).startOffset;
      const isBack = $event.key === 'ArrowLeft' || $event.key === 'Backspace';

      if ($event.key === 'Tab' || (caretPosition === 1 && isBack)) {
        return preventAndStopPropagation($event);
      }

      this.lastCaretPosition = caretPosition + (isBack ? -1 : 1);
      this.moveCursor();
    }

    moveCursor() {
      const prompt = document.querySelector('.line:last-child .prompt');

      if (prompt instanceof HTMLElement) {
        prompt.style.setProperty('--caret-position', (this.lastCaretPosition * 8) + 'px');
      }
    }

    enter($event: Event) {
      const input = this.input();

      if (!input) {
        return;
      }

      const command = input.textContent && input.textContent.trim();

      if (command) {
        this.newLine({command});
        this.history.push(command);
        this.historyPosition = this.history.length;
      }

      this.newLine();

      this.$nextTick(() => {
        const bashElement = document.querySelector('.bash');

        if (bashElement) {
          bashElement.scrollTop = bashElement.scrollHeight;
        }
      });

      return preventAndStopPropagation($event);
    }

    click($event: MouseEvent) {
      if (!event || !(event.target instanceof HTMLElement) || !event.target.classList.contains('zone')) {
        return preventAndStopPropagation($event);
      }
    }

    newLine(mode: LineType = {mode: 'prompt'}) {
      const line: Line = {
        ...mode,
        key: new Date().getTime() + this.lines.length,
        editable: true,
      };

      this.lines.push(line);

      if (this.current) {
        this.current.editable = false;
      }

      this.current = line;
      this.lastCaretPosition = 1;

      this.promptFocus();
    }

    promptFocus() {
      this.$nextTick(() => {
        const currentZone = this.input();

        if (!currentZone) {
          return;
        }

        const selection = window.getSelection();


        const textNode = currentZone.childNodes[0];
        const textLength = (textNode && textNode.textContent && textNode.textContent.length) || 0;
        this.lastCaretPosition = this.lastCaretPosition > textLength ?
          textLength :
          this.lastCaretPosition;

        console.log('child', currentZone.childNodes[0], this.lastCaretPosition);

        selection.setPosition(currentZone.childNodes[0], this.lastCaretPosition);

        this.moveCursor();
      });
    }

    handleVirus() {
      this.blueScreen = true;
    }

    handleClear() {
      this.lines = [];
      this.newLine();
    }
  }
</script>

<style lang="scss" scoped>
  @import '../variables';

  .header {
    background: #300924 url('../assets/ubuntu_bash_header.png') no-repeat top center;
    height: 28px;
    width: 700px;
    margin: auto;
    border-radius: 7px 7px 0 0;
  }

  .bash {
    background-color: #300924;
    height: 300px;
    width: 700px;
    margin: auto;
    font-family: $term-font;
    color: white;
    text-align: left;
    overflow: scroll;
    position: relative;
  }

  .blueScreen::before {
    content: '';
    background: blue url('../assets/crash_windows.jpg') no-repeat center center;
    height: 100%;
    width: 100%;
    display: block;
    overflow: hidden;
    position: absolute;
    z-index: 1;
  }

  .bash::-webkit-scrollbar {
    display: none;
  }

  .no-style {
    outline: none;
    background: transparent;
    border: none;
    color: white;
    font-size: 1em;
    display: block;
    min-width: 10px;
  }

  .prompt {
    caret-color: transparent;
    --caret-position: 15px;

    &[contenteditable='true'] .zone {
      position: relative;
      &::before {
        content: '';
        width: 1px;
        height: 15px;
        padding-top: 2px;
        display: inline-block;
        vertical-align: bottom;
        border-right: 6px solid white;
        animation: terminal-blink-caret 0.75s step-end infinite;
        position: absolute;
        left: var(--caret-position);
      }
    }
  }

  @keyframes terminal-blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: white;
    }
  }

  .bold {
    font-weight: bold;
  }

  .ubuntu-green {
    color: $green;
  }

  .ubuntu-blue {
    color: $blue;
  }

  .right {
    text-align: right;
  }
</style>
