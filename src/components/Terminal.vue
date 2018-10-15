<template>
    <div class="bash" @click="bashEnter">
        <div class="prompt no-style"
             v-for="line in lines"
             :key="line.key"
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
</template>

<script>
    function preventAndStopPropagation($event) {
        $event.preventDefault();
        $event.stopImmediatePropagation();
        return false;
    }

    export default {
        data() {
            return {
                prompt: 'thomas@thomas:~/ ',
                current: null,
                lines: [],
                lastCaretPosition: 1,
            }
        },
        created() {
            this.newLine();
        },
        methods: {
            keypress($event) {
                const caretPosition = window.getSelection().getRangeAt(0).startOffset;
                const isBack = ($event.key === 'ArrowLeft' || $event.key === 'Backspace');

                if (caretPosition === 1 && isBack) {
                    return preventAndStopPropagation($event);
                }

                this.lastCaretPosition = caretPosition + (isBack ? -1 : 1);
            },
            enter($event) {
                this.newLine();

                return preventAndStopPropagation($event);
            },
            click($event) {
                const selection = window.getSelection();
                const caretPosition = selection.focusOffset === 0 ? 0 : selection.getRangeAt(0).startOffset;

                if (caretPosition < this.prompt.length) {
                    return preventAndStopPropagation($event);
                }
            },
            bashEnter() {
                this.promptFocus();
            },
            newLine() {
                const line = {
                    key: new Date().getTime(),
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
                    const currentZone = document.querySelector('.prompt:last-child .zone');
                    const selection = window.getSelection();

                    selection.setPosition(currentZone.childNodes[0], this.lastCaretPosition);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bash {
        background: #300924 url('../assets/ubuntu_bash_header.png') no-repeat top center;
        height: 300px;
        width: 700px;
        margin: auto;
        font-family: 'Ubuntu', monospace;
        color: white;
        padding-top: 30px;
        text-align: left;
        border-radius: 7px 7px 0 0;
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

        &[contenteditable=true]::after {
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
        from, to {
            border-color: transparent
        }
        50% {
            border-color: white;
        }
    }

    .bold {
        font-weight: bold;
    }

    .ubuntu-green {
        color: #87da34;
    }

    .ubuntu-blue {
        color: #7C83A7;
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