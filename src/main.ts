import Vue from 'vue';
import App from './App.vue';
import vueSmoothScroll from 'vue2-smooth-scroll';
import './filters';
import BootstrapVue from 'bootstrap-vue';
import Vuetify from 'vuetify';

Vue.use(vueSmoothScroll);
Vue.use(BootstrapVue);
Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
