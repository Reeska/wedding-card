<template>
  <div>
    <div><img src="../../assets/pizza.gif" class="smallGif"/></div>
    <p>T'inquiète pas, y aura pas de pizza à compter <img src="../../assets/proud.gif"/></p>
    <p><img src="../../assets/olaf.gif" class="verySmall"/></p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Olaf extends Vue {}
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
