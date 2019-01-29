import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import Vuetify from 'vuetify';
import vueSmoothScroll from 'vue2-smooth-scroll';

import App from './App.vue';
import Home from './components/routes/Home.vue';
import Dashboard from './components/routes/Dashboard.vue';
import './filters';

Vue.use(vueSmoothScroll);
Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: Dashboard },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
