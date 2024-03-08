import Router from 'vue-router';
export default () => {
  return new Router({
    mode: 'hash',
    base: 'cyc',
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        name: '首页',
        component: () => import(/* webpackChunkName: "home" */'./view/home.vue'),
      },
      {
        path: '/act',
        name: '切换ip操作',
        component: () => import(/* webpackChunkName: "action-test-page" */'./view/action-test-page.vue'),
      },
      {
        path: '/jsx',
        name: 'jsx配置实验',
        component: () => import(/* webpackChunkName: "jsx-test" */'./view/jsx-test.vue'),
      },
      {
        path: '/export',
        name: '模块倒入倒出test',
        component: () => import(/* webpackChunkName: "import-test" */'./view/import-test'),
      },
      {
        path: '/math',
        name: '精确计算实验',
        component: () => import(/* webpackChunkName: "import-test" */'./view/math-test'),
      },
      {
        path: '/virtual',
        name: '虚拟表格构建思路实验',
        component: () => import(/* webpackChunkName: "import-test" */'./view/VirtualTableComs/index.vue'),
      },
      {
        path: '/lazy-load',
        name: '图片懒加载',
        component: () => import(/* webpackChunkName: "import-test" */'./view/lazy-load/index.vue'),
      },
      {
        path: '/get-ip',
        name: '获取本机IP方案',
        component: () => import(/* webpackChunkName: "import-test" */'./view/get-ip.vue'),
      },
      {
        path: '/npm-pack-test',
        name: '包实验场',
        component: () => import(/* webpackChunkName: "import-test" */'./view/npm-pack-test/index'),
      },
    ],
  });
};

