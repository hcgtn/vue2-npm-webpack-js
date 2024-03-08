import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import createRouter from './router';
import HttpTool from '@/common/utils/http.tool';
import env from '@/config/env.json';
import ViewUI from 'view-design';
import VXETable from 'vxe-table';
import VueLazyload from 'vue-lazyload';

import 'view-design/dist/styles/iview.css';
import 'vxe-table/lib/style.css';

Vue.use(ViewUI);
Vue.use(VXETable);
// Vue.use(VueLazyload);
// or with options
const loadimage = require('./assets/logo.png')
const errorimage = require('./assets/logo.png');

Vue.use(VueLazyload, {
  preLoad: 1.3, // 预加载高度比例
  error: errorimage,
  loading: loadimage,
  throttleWait: 500, // 节流
  attempt: 1,
});

const router = createRouter();
Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.prototype.$HttpTool = HttpTool;
Vue.prototype.$env = env;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

/**
 * 解决 txe-table出现的绘制监听问题
 * 一般没有设置width宽度的时候会出现这个问题
 * 添加一个min-width/width会解决这个问题
 */
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
};
