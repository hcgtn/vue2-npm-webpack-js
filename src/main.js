import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import createRouter from './router';

const router = createRouter();
Vue.config.productionTip = false
Vue.use(VueRouter);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
