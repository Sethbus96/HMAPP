import Vue from 'vue';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import axios from './plugins/axios';

import Footer from './components/footer';

Vue.component('Footer', Footer);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;
Vue.use(axios);
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
