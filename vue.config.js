const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    // 代理配置
    proxy: {
      // 当我们本地访问带有/api的时候才会触发跨域
      '/api': {
        target: 'http://localhost:3000', // 要代理的地址
        changeOrigin: true, // 是否跨域,需要设置为true
        logLevel: 'debug',
        // 路径重写
        pathRewrite: {
          // 路径重写默认 localhost: xxx/api/abc => www.xxx.com/api/abc
          '^/api': '' // 设置为 localhost: xxx/api/abc => www.xxx.com/abc
        }
      }
    }
  }
})
