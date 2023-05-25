const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

class Main {
  constructor() {
    this.pathMapping = new Map();
    this.router = new Router({
      prefix: '/person1'
    });
  }
  asyncReaddir(dir) {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      })
    })
  }
  async init(dir = './apiJson') {
    const files = await this.asyncReaddir(dir);
    for (let i = 0; i < files.length; i++) {
      if (files[i].endsWith('.json')) {
        const fileJson = await require(`${dir}/${files[i]}`)
        if (!fileJson.length) continue
        fileJson.forEach(el => {
          const type = el.type || 'json';
          if (type === 'json') {
            const key = `${el.method.toUpperCase().trim()} ${el.path}`;
            this.pathMapping.set(key, el.result);
          }
        });
      }
    }
    for (let [k, v] of this.pathMapping) {
      if (k.startsWith('POST')) {
        const path = k.slice(5);
        this.router.post(path, function (ctx, next) {
          ctx.state = 200;
          ctx.response.body = JSON.stringify(v);
        });
      }
    }
    return this.router.routes();
  }
}

module.exports = new Main();