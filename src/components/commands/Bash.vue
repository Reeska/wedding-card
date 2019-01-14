<template>
  <Prompt
    :extra="extra"
    :label="label"
    @newLine="newLine">
  </Prompt>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import Prompt from './Prompt.vue';
  import { LineType } from '../../types';

  @Component({
    components: {
      Prompt,
    },
  })
  export default class Login extends Vue {
    @Prop()
    public extra: any;
    @Prop()
    public username: string | undefined;

    get label() {
      return `<span class="ubuntu-green bold">${this.username}@${this.username}</span>` +
        `:<span class="ubuntu-blue bold">~/</span>`;
    }

    public newLine($event: LineType) {
      this.$emit('newLine', $event);
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
