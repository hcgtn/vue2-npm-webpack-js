const { defineConfig } = require('@vue/cli-service')
// LEVELS[LEVELS["debug"] = 10] = "debug";
// LEVELS[LEVELS["info"] = 20] = "info";
// LEVELS[LEVELS["warn"] = 30] = "warn";
// LEVELS[LEVELS["error"] = 50] = "error";
// LEVELS[LEVELS["silent"] = 80] = "silent";
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    // 代理配置
    proxy: {
      // 当我们本地访问带有/api的时候才会触发跨域
      '/api': {
        target: 'http://localhost:4355/person1', // 要代理的地址
        changeOrigin: true, // 是否跨域,需要设置为true
        logLevel: 'debug',
        // router: req => {
          // console.log(req);
        // },
        // 路径重写
        pathRewrite: {
          // 路径重写默认 localhost: xxx/api/abc => www.xxx.com/api/abc
          '^/api': '' // 设置为 localhost: xxx/api/abc => www.xxx.com/abc
        }
      }
    }
  }
})
