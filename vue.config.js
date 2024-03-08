
const {defineConfig} = require('@vue/cli-service');
const fs = require('fs');
const path = require('path');
// 服务端改ip配置
// const createProxy = require('./dynamic_proxy');
// 客户端改ip配置
const proxyList = require('./src/config/proxy.list.json');
module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: (config) => {
    // console.log(process.env.apiconfig.trim())
    // console.log(config);
    fs.writeFileSync('./src/config/env.json', JSON.stringify({env: process.env.apiconfig.trim()}));
  },
  devServer: {
    port: 8080,
    // 代理配置
    proxy: {
      // 当我们本地访问带有/api的时候才会触发跨域
      '/api': {
        target: 'http://localhost:4355/person1', // 要代理的地址,配置了router就走router了
        changeOrigin: true, // 是否跨域,需要设置为true
        logLevel: 'debug',
        router: (req) => {
          // 服务端改ip配置
          // return createProxy().getActiveProxy().ip;
          // 客户端改ip配置
          const rexp = /\/(.+)\/api/g;
          const env = rexp.exec(req.url)[1];
          console.log('env>>>>', env);
          console.log('proxyList>>>>', proxyList, req.url);
          return proxyList.find((i) => i.name === env).ip;
        },
        ws: true,
        // 路径重写
        // pathRewrite: {
        //   // 服务端改ip配置
        //   // '(.*)/api/': ''
        //   // 客户端改ip配置,把多余的api去掉,保证访问正确的地址
        //   '(.*)/api/': '' // 设置为 localhost: xxx/api/abc => www.xxx.com/abc 支持正则匹配
        // },
        pathRewrite: (path)=>{
          const r = path.replace(/(.+api)?\/(.+)/g, '$2');
          console.log('r>>>', r);
          return r;
        },
      },
    },
  },
  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.join(__dirname, './src/assets/style/index.less')],
    },
  },
});
