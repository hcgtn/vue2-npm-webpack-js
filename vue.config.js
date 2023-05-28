
const { defineConfig } = require('@vue/cli-service')
const fs = require('fs');
const createProxy = require('./dynamic_proxy');

// import base_ip_config from '@/config/base_ip.js'
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    // console.log(process.env.apiconfig.trim())
    // console.log(config);
    fs.writeFileSync('./src/config/env.json', JSON.stringify({ env: process.env.apiconfig.trim() }));
  },
  devServer: {
    port: 8080,
    // 代理配置
    proxy: {
      // 当我们本地访问带有/api的时候才会触发跨域
      '/api': {
        // target: base_ip_config.apiconfig, // 要代理的地址
        target: 'http://localhost:4355/person1', // 要代理的地址
        changeOrigin: true, // 是否跨域,需要设置为true
        logLevel: 'debug',
        router: req => {
          return createProxy().getActiveProxy().ip;
        },
        // 路径重写
        pathRewrite: {
          // 路径重写默认 localhost: xxx/api/abc => www.xxx.com/api/abc
          '^/api': '' // 设置为 localhost: xxx/api/abc => www.xxx.com/abc
        }
      }
    }
  }
})
