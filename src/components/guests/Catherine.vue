<template>
  <div>
    <div><img src="../../assets/sherlock.gif" class="smallGif"/></div>
    <p>Un petit gif de Sherlock pour te faire plaisir <img src="../../assets/proud.gif"/></p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Catherine extends Vue {}
</script>

<style lang="scss">
  .smallGif {
    max-width: 290px;
    margin-bottom: 10px;
  }
</style>
