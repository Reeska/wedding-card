<template>
  <div>
    <div><img src="../../assets/you.gif" class="smallGif"/></div>
    <p>Parfait, je t'attendais 😎.</p>
    <p>Tchai tiiiiiii</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Igor extends Vue {}
</script>

<style lang="scss">
  .smallGif {
    max-width: 290px;
    margin-bottom: 10px;
  }
</style>
