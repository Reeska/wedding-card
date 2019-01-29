<template>
  <div>
    <p>Si là tu nous dis qu'on t'a pas prévenu assez à l'avance...</p>
    <div><img src="../../assets/kaamelott1.gif" class="smallGif"/></div>
    <p>D'ailleurs, tu devrais pas être entrain de répondre aux questions en passant par le mode geek, toi ? <img src="../../assets/batte.gif"/></p>
    <p><span class="secret">c'est pas grave on t'aime quand même</span></p>
    <img src="../../assets/cute.gif"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Akli extends Vue {}
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
