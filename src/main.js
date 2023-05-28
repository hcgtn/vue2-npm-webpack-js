import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import createRouter from './router';
import HttpTool from '@/common/utils/http.tool';
import env from '@/config/env.json';
console.log("env>>>>",env);

const router = createRouter();
Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.prototype.$HttpTool = HttpTool;
Vue.prototype.$env = env;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
