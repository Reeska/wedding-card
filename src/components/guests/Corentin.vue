<template>
  <div>
    <p>Tu fais pas le mode geek toi ?</p>
    <p><img src="https://media1.tenor.com/images/1f3e64eb5c24881b3d1b0c8cd54e4555/tenor.gif" class="smallGif"/></p>
    <p>En tout cas on espère que tu viendras, avec Céline si elle veut <img src="../../assets/cute.gif"/></p>
    <p><img src="../../assets/topela.gif" class="smallGif"/></p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Corentin extends Vue {}
</script>

<style lang="scss">
  .smallGif {
    max-width: 290px;
    margin-bottom: 10px;
  }
</style>
