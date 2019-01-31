<template>
  <div>
    <p>Ça va être la fête <img src="../../assets/sheep.gif"/></p>
    <p><img src="../../assets/mammamia.gif" class="smallGif"/></p>
    <p>Par contre si tu me spoiles encore une fois sur l'assassin royal...</p>
    <p><img src="../../assets/chick.jpg" class="verySmall"/></p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Maelle extends Vue {}
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
