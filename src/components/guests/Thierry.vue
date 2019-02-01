<template>
  <div>
    <div><img src="../../assets/ricard.gif" class="smallGif"/></div>
    <p>On en ramènera une bouteille au bar, t'en fais pas <img src="../../assets/proud.gif"/></p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Thierry extends Vue {}
</script>

<style lang="scss">
  .smallGif {
    max-width: 290px;
    margin-bottom: 10px;
  }
</style>
