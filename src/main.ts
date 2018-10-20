import Vue from 'vue';
import App from './App.vue';
import vueSmoothScroll from 'vue2-smooth-scroll';
import './filters';

Vue.use(vueSmoothScroll);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
