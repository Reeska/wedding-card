<template>
  <div
    v-show="enabled"
    class="blueScreen"
    contenteditable="true"
    ref="blueScreen"
    @keypress.prevent="exit">
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { OnMounted } from '../../types';

  @Component
  export default class Virus extends Vue implements OnMounted {
    public enabled = true;

    public mounted() {
      (this.$refs.blueScreen as HTMLElement).focus();
    }

    public exit() {
      this.enabled = false;
      this.$emit('exit', 0);
    }
  }
</script>

<style lang="scss">
  @import '../../variables';

  .blueScreen {
    background: blue url('../../assets/crash_windows.jpg') no-repeat center center;
    height: 100%;
    width: 100%;
    display: block;
    overflow: hidden;
    position: absolute;
    z-index: 1;
    top: 0;
    caret-color: transparent;
  }
</style>
