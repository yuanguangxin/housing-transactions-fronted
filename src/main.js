import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';


Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(iView);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app');
