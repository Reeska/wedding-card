<template>
  <div>
    <div><img src="../../assets/smash.gif" class="smallGif"/></div>
    <p>Yeah bro, heureux que tu t'inscrives à notre mariage (comme si tu avais le choix 😛).<br/>
      Si tu n'as pas trouvé les réponses à tes questions, nous sommes à ta disposition 😎.</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Farid extends Vue {}
</script>

<style lang="scss">
  .smallGif {
    max-width: 290px;
    margin-bottom: 10px;
  }
</style>
