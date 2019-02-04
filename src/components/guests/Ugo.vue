<template>
  <div>
    <p>Si tu viens pas...</p>
    <p><img src="../../assets/pain.gif" class="smallGif"/></p>
    <p><img src="../../assets/revolte.gif" class="smallGif"/></p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Ugo extends Vue {}
</script>

<style lang="scss">
  .smallGif {
    max-width: 290px;
    margin-bottom: 10px;
  }

  .verySmall {
    max-width: 200px;
  }
</style>
