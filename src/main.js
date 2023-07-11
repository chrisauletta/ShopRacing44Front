import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import http from './http'
import "./assets/css/app.scss";
import VueCarousel from 'vue-carousel';
import VueEasyLightbox from 'vue-easy-lightbox'
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(InfiniteLoading);
Vue.use(VueEasyLightbox)
Vue.use(VueCarousel);
Vue.prototype.$http = http;
Vue.prototype.$url = 'http://auto-unity.kinghost.net:21044/';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
