<template>
  <div>
    <div class="header"></div>
    <div class="bash" :class="blueScreen ? 'blueScreen' : ''" @click="bashEnter">
      <div v-for="line in lines" :key="line.key" class="line">
        <div v-if="line.mode === 'prompt'">
          <div class="prompt no-style" spellcheck="false" :contenteditable="line.editable" @keydown="keypress"
               @keypress.enter="enter" @mousedown="click">
            <span>
              <span class="ubuntu-green bold">thomas@thomas</span>:
              <span class="ubuntu-blue bold">~/</span>
            </span>
            <span class="zone"></span>
          </div>
        </div>
        <div v-else>
          <command :command="line.command" @virus="handleVirus"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Command from './Command';

  function preventAndStopPropagation($event) {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    return false;
  }

  export default {
    components: {
      Command
    },
    data() {
      return {
        prompt: 'thomas@thomas:~/ ',
        current: null,
        lines: [],
        lastCaretPosition: 1,
        blueScreen: false
      };
    },
    created() {
      this.newLine({ mode: 'prompt' });
    },
    methods: {
      keypress($event) {
        if (this.blueScreen) {
          this.blueScreen = false;
          return preventAndStopPropagation($event);
        }
        const caretPosition = window.getSelection().getRangeAt(0).startOffset;
        const isBack = $event.key === 'ArrowLeft' || $event.key === 'Backspace';

        if ($event.key === 'Tab' || (caretPosition === 1 && isBack)) {
          return preventAndStopPropagation($event);
        }

        this.lastCaretPosition = caretPosition + (isBack ? -1 : 1);
      },
      enter($event) {
        const command = document
          .querySelector('.line:last-child .zone')
          .textContent.trim();
        if (command) {
          this.newLine({ command });
        }
        this.newLine({ mode: 'prompt' });

        this.$nextTick(() => {
          var bashElement = document.querySelector('.bash');
          bashElement.scrollTop = bashElement.scrollHeight;
        });

        return preventAndStopPropagation($event);
      },
      click($event) {
        const selection = window.getSelection();
        const caretPosition =
          selection.focusOffset === 0 ? 0 : selection.getRangeAt(0).startOffset;

        if (caretPosition < this.prompt.length) {
          return preventAndStopPropagation($event);
        }
      },
      bashEnter() {
        this.promptFocus();
      },
      newLine(mode) {
        const line = {
          ...mode,
          key: this.lines.length,
          editable: true,
          content: ''
        };

        this.lines.push(line);

        if (this.current) {
          this.current.editable = false;
        }

        this.current = line;
        this.lastCaretPosition = 1;

        this.promptFocus();
      },
      promptFocus() {
        this.$nextTick(() => {
          const currentZone = document.querySelector('.line:last-child .zone');
          const selection = window.getSelection();

          if (currentZone.childNodes.length === 0) {
            currentZone.appendChild(document.createTextNode(' '));
          }

          selection.setPosition(currentZone.childNodes[0], this.lastCaretPosition);
        });
      },
      handleVirus() {
        this.blueScreen = true;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../colors.scss';

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
    font-family: 'Ubuntu', monospace;
    color: white;
    text-align: left;
    overflow: scroll;
    position: relative;
  }

  .blueScreen::before {
    content: '';
    background: blue url('../assets/crash_windows.png') no-repeat center center;
    height: 100%;
    width: 100%;
    display: block;
    overflow: hidden;
    position: absolute;
  }

  .bash::-webkit-scrollbar {
    display: none;
  }

  .no-style {
    outline: none;
    background: transparent;
    border: none;
    font-family: 'Ubuntu', monospace;
    color: white;
    font-size: 1em;
    display: block;
    min-width: 10px;
  }

  .prompt {
    caret-color: transparent;

    &[contenteditable=true] .zone::after {
      content: '';
      width: 1px;
      height: 15px;
      padding-top: 2px;
      display: inline-block;
      vertical-align: bottom;
      border-right: 6px solid white;
      animation: terminal-blink-caret .75s step-end infinite;
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

  #bash {
    margin-left: -3px;
  }

  #bash td {
    padding-left: 3px;
    padding-right: 3px;
  }
</style>
