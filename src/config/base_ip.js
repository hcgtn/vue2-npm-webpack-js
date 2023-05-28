// 引入 env.json 文件，因为每次启动项目时，会自动写入输入的命令，这样我们就可以动态控制 ip
import env from './env.json'

const base_ip_config = {
  // 开发环境
  "serve": {
    base_ip: 'http://localhost:4355/person1'
  },
  "serve-test": {
    base_ip: 'http://localhost:4355/person2'
  },
  // 生产环境
  "build": {
    base_ip: 'http://192.168.4.174'
  }
}

export default base_ip_config[env.env]
