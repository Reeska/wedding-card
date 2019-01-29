import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';
import Dashboard from './Dashboard.vue';
import vueSmoothScroll from 'vue2-smooth-scroll';
import VueRouter from 'vue-router';
import './filters';
import BootstrapVue from 'bootstrap-vue';
import Vuetify from 'vuetify';

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
