import Vue from 'vue';
import App from './App.vue';
import vueSmoothScroll from 'vue2-smooth-scroll';
import './filters';
import BootstrapVue from 'bootstrap-vue'

Vue.use(vueSmoothScroll);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
