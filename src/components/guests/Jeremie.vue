<template>
  <div>
    <p><img src="../../assets/gandalf.gif" class="smallGif"/></p>
    <p>Bon, tu peux venir, mais seulement si tu dis que le seigneur des anneaux déchire tout <img src="../../assets/hehe.gif"/><br/>Non ?</p>
    <p><img src="../../assets/frodo.gif" class="smallGif"/></p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Jeremie extends Vue {}
</script>

<style lang="scss">
  .smallGif {
    max-width: 290px;
    margin-bottom: 10px;
  }

  .secret {
    text-decoration: line-through;
    font-size: 0.7em;
  }
</style>
