<template>
  <div
    class="prompt no-style"
    spellcheck="false"
    :contenteditable="editable"
    @keydown="keypress"
    @keyup="keyup"
    @keypress.enter="enter">
    <span v-html="label"></span>
    <span class="zone" v-bind:class="{ transparent: isPassword }" ref="zone">&nbsp;</span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { LineType, OnMounted } from '../../types';
  import { CONTROL_KEYS } from '../../services/constantes';
  import { Observable } from 'rxjs';

  function preventAndStopPropagation($event: Event) {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    return false;
  }

  const history: string[] = [];
  const possibleCommands: string[] = ['ls', './mariage.sh', './virus.sh', 'sh', 'clear'];
  let historyPosition = 0;

  @Component
  export default class Prompt extends Vue implements OnMounted {
    @Prop()
    public events?: Observable<Event>;

    @Prop()
    public label: any;

    @Prop()
    public isPassword?: boolean;

    public editable: boolean = true;
    private lastCaretPosition = 1;
    private ctrlDown: boolean = false;

    mounted() {
      this.promptFocus();

      if (this.events) {
        this.events.subscribe(() => {
          this.promptFocus();
        });
      }
    }

    public keypress($event: KeyboardEvent) {
      const input = this.$refs.zone as HTMLElement;

      if ($event.key === 'ArrowUp') {
        if (input && history && historyPosition > 0) {
          this.setInputWithCursor(history[--historyPosition]);
          return;
        }
      }

      if ($event.key === 'ArrowDown') {
        if (input && history && historyPosition < history.length) {
          this.setInputWithCursor(history[++historyPosition]);
          return;
        }
      }

      if ($event.key === 'Tab') {
        const text = (input.textContent || '').trim();
        const possibleCommand = possibleCommands.filter(command => command.startsWith(text));

        if (possibleCommand && possibleCommand.length === 1) {
          this.setInputWithCursor(possibleCommand[0]);
        }

        preventAndStopPropagation($event);
      }

      const caretPosition = window.getSelection().getRangeAt(0).startOffset;
      const isBack = $event.key === 'ArrowLeft' || $event.key === 'Backspace';

      if (caretPosition === 1 && isBack) {
        return preventAndStopPropagation($event);
      }

      const inputLength = (input && input.textContent && input.textContent.length) || 0;
      const nextCaretPosition = caretPosition + (isBack ? -1 : 1);

      if ($event.key !== 'ArrowRight' || nextCaretPosition <= inputLength) {
        this.lastCaretPosition = nextCaretPosition;
        this.moveCursor();
      }

      if (CONTROL_KEYS.includes($event.keyCode)) {
        this.ctrlDown = true;
      }

      if (this.ctrlDown && $event.keyCode === 85) {
        this.setInputWithCursor('');
        $event.preventDefault();
      }

      this.$emit('keydown', $event);
    }

    public keyup($event: KeyboardEvent) {
      if (CONTROL_KEYS.includes($event.keyCode)) {
        this.ctrlDown = false;
      }
      this.$emit('keyup', $event);
    }

    public enter($event: Event) {
      const input = this.$refs.zone as HTMLElement;

      if (!input) {
        return;
      }

      const command = (input.textContent && input.textContent.trim()) || '';

      if (command) {
        history.push(command);
        historyPosition = history.length;
      }

      this.newLine({ command });

      this.editable = false;

      return preventAndStopPropagation($event);
    }

    private setInputWithCursor(value: string = '') {
      this.setInput(value);
      this.restoreCaretPositionToLatest();
      this.moveCursor();
    }

    private setInput(value: string = '') {
      const input = this.$refs.zone as HTMLElement;

      input.innerHTML = `&nbsp;${value || ''}`;
      this.lastCaretPosition = (input.textContent || '').length;
    }

    private newLine(line?: LineType) {
      this.$emit('newLine', line);
    }

    private moveCursor() {
      const input = this.$refs.zone;

      this.$nextTick(() => {
        if (input instanceof HTMLElement) {
          const char = input && input.textContent && input.textContent.charAt(this.lastCaretPosition);

          const newCaretPosition = this.isPassword ? 8 : this.lastCaretPosition * 8;

          input.style.setProperty('--caret-position', newCaretPosition + 'px');
          input.style.setProperty('--current-character', `'${char}'`);
        }
      });
    }

    private promptFocus() {
      if (!this.editable) {
        return;
      }

      this.$nextTick(() => {
        this.restoreCaretPositionToLatest();
        this.moveCursor();
      });
    }

    private restoreCaretPositionToLatest() {
      const currentZone = this.$refs.zone as HTMLElement;

      if (!currentZone) {
        return;
      }

      const selection = window.getSelection();

      selection.setPosition(currentZone.childNodes[0], this.lastCaretPosition);
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../variables';

  .prompt {
    caret-color: transparent;
    outline: none;

    &[contenteditable='true'] .zone {
      --caret-position: 8px;
      --current-character: '';
      position: relative;

      &::before {
        content: '' var(--current-character) '';
        width: 1px;
        height: 15px;
        padding-top: 2px;
        display: inline-block;
        vertical-align: bottom;
        border-right: 6px solid white;
        animation: terminal-blink-caret 0.75s step-end infinite;
        position: absolute;
        left: var(--caret-position);
        line-height: 12px;
      }
    }
  }

  @keyframes terminal-blink-caret {
    from,
    to {
      border-color: transparent;
      color: transparent;
    }
    50% {
      border-color: white;
      color: black;
    }
  }

  /deep/ {
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
  }

  .transparent {
    color: #300924;
  }
</style>
