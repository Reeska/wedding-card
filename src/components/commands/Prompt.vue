<template>
  <div
    class="prompt no-style"
    spellcheck="false"
    :contenteditable="editable"
    @keydown="keypress"
    @keypress.enter="enter"
    @mousedown="click">
      <span>
        <span class="ubuntu-green bold">thomas@thomas</span>:<span class="ubuntu-blue bold">~/</span>
      </span>
    <span class="zone" ref="zone">&nbsp;</span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop, Watch } from 'vue-property-decorator';
  import { LineType, OnMounted } from '../../types';

  function preventAndStopPropagation($event: Event) {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    return false;
  }

  const history: string[] = [];
  let historyPosition = 0;

  @Component
  export default class Prompt extends Vue implements OnMounted {
    @Prop()
    public extra: any;
    public editable: boolean = true;

    private history: string[] = [];
    private historyPosition = 0;
    private lastCaretPosition = 1;

    mounted() {
      this.promptFocus();
    }

    @Watch('extra', { immediate: true, deep: true })
    public onExtraChanged() {
      this.promptFocus();
    }

    public keypress($event: KeyboardEvent) {
      const input = this.$refs.zone as HTMLElement;

      if ($event.key === 'ArrowUp') {
        if (input && history && historyPosition > 0) {
          historyPosition--;
          input.innerHTML =
            '&nbsp;' + (history[historyPosition] || '');
          this.lastCaretPosition = (input.textContent || '').length;
          this.restoreCaretPositionToLatest();
          this.moveCursor();
          return;
        }
      }

      if ($event.key === 'ArrowDown') {
        if (input && history && historyPosition < history.length) {
          historyPosition++;
          console.log(historyPosition, history[historyPosition]);
          input.innerHTML = '&nbsp;' + (history[historyPosition] || '');
          console.log('html', input.innerHTML);
          this.lastCaretPosition = (input.textContent || '').length;
          this.restoreCaretPositionToLatest();
          this.moveCursor();
          return;
        }
      }

      const caretPosition = window.getSelection().getRangeAt(0).startOffset;
      const isBack = $event.key === 'ArrowLeft' || $event.key === 'Backspace';

      if ($event.key === 'Tab' || (caretPosition === 1 && isBack)) {
        return preventAndStopPropagation($event);
      }

      const inputLength =
        (input && input.textContent && input.textContent.length) || 0;
      const nextCaretPosition = caretPosition + (isBack ? -1 : 1);

      if ($event.key !== 'ArrowRight' || nextCaretPosition <= inputLength) {
        this.lastCaretPosition = nextCaretPosition;
        this.moveCursor();
      }
    }

    public enter($event: Event) {
      const input = this.$refs.zone as HTMLElement;

      if (!input) {
        return;
      }

      const command = input.textContent && input.textContent.trim();

      if (command) {
        this.newLine({ command });
        history.push(command);
        historyPosition = history.length;
      }

      this.editable = false;

      return preventAndStopPropagation($event);
    }

    public click($event: MouseEvent) {
      if (
        !event ||
        !(event.target instanceof HTMLElement) ||
        !event.target.classList.contains('zone')
      ) {
        return preventAndStopPropagation($event);
      }
    }

    private newLine(line?: LineType) {
      this.$emit('newLine', line);
    }

    private moveCursor() {
      const input = this.$refs.zone;

      this.$nextTick(() => {
        if (input instanceof HTMLElement) {
          const char =
            input &&
            input.textContent &&
            input.textContent.charAt(this.lastCaretPosition);

          input.style.setProperty(
            '--caret-position',
            this.lastCaretPosition * 8 + 'px',
          );
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

      console.log('setPosition', currentZone.childNodes[0], this.lastCaretPosition);

      selection.setPosition(currentZone.childNodes[0], this.lastCaretPosition);
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../variables';

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
