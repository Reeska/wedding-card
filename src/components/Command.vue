<template>
  <div>
    <div v-if="result">{{result}}</div>
    <div v-if="resultAsComponent">
      <component :is="resultAsComponent" :options="options"></component>
    </div>
  </div>
</template>

<script>
  import Ls from './Ls.vue';
  export default {
    data() {
      return {
        result: '',
        resultAsComponent: '',
        options: [],
      };
    },
    props: {
      command: String,
    },
    components: { Ls },
    created() {
      const asArray = this.command.trim().split(' ');
      const command = asArray[0];
      const parameters = asArray[1];
      switch (command) {
        case 'll':
          this.options.push('l');
        case 'ls':
          if (parameters) {
            const optionsAsArray = parameters.split('-')[1].split('');
            this.options.push.apply(this.options, optionsAsArray);
          }
          this.resultAsComponent = 'ls';
          break;
        case 'clear':
          this.$emit('clear');
          break;
        case './mariage.sh':
        case 'sh mariage.sh':
          this.result = 'bienvenue !';
          break;
        case './virus.sh':
        case 'sh virus.sh':
          this.$emit('virus');
          break;
        default:
          this.result = `-bash: ${this.command}: command not found`;
      }
    },
  };
</script>

<style lang="scss" scoped>
</style>
