<template>
  <div>
    <p>Bah, t'as peur de tester le mode geek ?</p>
    <p><img src="../../assets/karim.gif" class="smallGif"/></p>
    <p>Enfin ça y est, tu t'es fait au fait que Thomas allait devenir ton beau-frère ? <img src="../../assets/proud.gif"/></p>
    <p><img src="../../assets/arthur.gif" class="smallGif"/></p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Guillaume extends Vue {}
</script>

<style lang="scss">
  .smallGif {
    max-width: 290px;
    margin-bottom: 10px;
  }
</style>
