<template>
  <div>
    Hello world
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  import { config } from '../../config';
  import { OnCreated } from '../../types';

  @Component
  export default class Dashboard extends Vue implements OnCreated {
    private apiKey: string = config.maps.apiKey;
    public created() {
      console.log('hello world');
    }
  }
</script>

<style lang="scss">
</style>
