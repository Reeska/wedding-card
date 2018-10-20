import Vue from 'vue';

Vue.filter('nl2br', (value: string) => {
  return value && value.replace(/\n/g, '<br/>');
});
