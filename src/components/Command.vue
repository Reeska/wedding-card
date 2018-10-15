<template>
    <div>
        <div v-if="result">{{result}}</div>
        <div v-if="resultAsComponent">
            <component :is="resultAsComponent"></component>
        </div>
    </div>
</template>

<script>
import Ls from './Ls.vue';

export default {
  data() {
    return {
      result: '',
      resultAsComponent: ''
    };
  },
  props: {
    command: String
  },
  components: { Ls },
  created() {
    switch (this.command) {
      case 'ls':
        this.resultAsComponent = 'ls';
        break;
      case './mariage.sh':
      case 'sh mariage.sh':
        this.result = 'bienvenue !';
        break;
      case './virus.sh':
      case 'sh virus.sh':
        // this.result = 'ohoh';
        this.$emit('virus');
        break;
      default:
        this.result = `-bash: ${this.command}: command not found`;
    }
    console.log('created');
    //this.newLine({ mode: "prompt" });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>