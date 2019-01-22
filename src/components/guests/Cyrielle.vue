<template>
  <div>
    <div><img src="../../assets/airplane.gif"/></div>
    <h4 class="blink">
      <span class="bg-primary text-warning">MJN air</span>
    </h4>
    <div class="quote">&ldquo;You can make it play music, and the words flash, and, you know, put in things like the line of dancing aeroplanes – you know, make it look ... make it look really professional.&ldquo;</div>
    <div class="paragraph">Pardon, j'ai pas pu résister <img src="../../assets/proud.gif"/> T'as de la chance, j'ai pas mis la musique <img src="../../assets/hide.gif"/></div>
    <img class="smallGif" src="../../assets/ron.gif"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Cyrielle extends Vue {}
</script>

<style lang="scss">
  .blink {
    animation: blinker 1s linear infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }

  .quote {
    font-style: italic;
    color: grey;
  }

  .paragraph {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .smallGif {
    max-width: 290px;
    margin-bottom: 10px;
  }
</style>
