<template>
  <div>
    <p>Maman ! <img src="../../assets/cute.gif"/></p>
    <p><img src="../../assets/hug.gif" class="verySmall"/></p>
    <p>Je sais que je suis ta fille préférée, t'en fais pas, tu n'as pas besoin de le dire.</p>
    <p><img src="../../assets/bean.gif" class="smallGif"/></p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Justine extends Vue {}
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
