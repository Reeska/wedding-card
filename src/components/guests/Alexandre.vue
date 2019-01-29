<template>
  <div>
    <div><img src="../../assets/unicorn.gif" class="smallGif"/></div>
    <p>Dude, on t'aime <img src="../../assets/sheep.gif"/></p>
    <p>T'as intérêt à avoir trouvé tous les easter eggs <img src="../../assets/roll.gif"/> Et oublie pas de ramener charlie aux p'tites poules <img src="../../assets/cute.gif"/></p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Alexandre extends Vue {}
</script>

<style lang="scss">
  .smallGif {
    max-width: 290px;
    margin-bottom: 10px;
  }
</style>
