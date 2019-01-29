<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { config } from './config';
  import Component from 'vue-class-component';

  @Component({})
  export default class App extends Vue {}
</script>

<style lang="scss">
</style>
