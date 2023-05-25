import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import createRouter from './router';
import HttpTool from '@/common/utils/http.tool';

const router = createRouter();
Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.prototype.$HttpTool = HttpTool;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
