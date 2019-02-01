<template>
  <div>
    <div><img src="../../assets/beer.gif" class="smallGif"/></div>
    <p>On compte sur toi pour pas finir mort dans les toilettes comme l'autre fois <img src="../../assets/proud.gif"/>
    Et ça y est t'es coach agile, tu vas même pas t'amuser avec le mode geek ? <img src="../../assets/roll.gif"/></p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Abdoulaye extends Vue {}
</script>

<style lang="scss">
  .smallGif {
    max-width: 290px;
    margin-bottom: 10px;
  }
</style>
