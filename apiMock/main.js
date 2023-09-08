const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const { v4: uuidv4 } = require('uuid');
console.log(uuidv4)
function keyDataFac(path, v) {
  switch (path) {
    case '/table-page-list':
    case '/table-list':
      v.body.data = v.body.data.map(i => ({ ...i, uuid: uuidv4().replace(/-/g, '') }));
      return v
    default:
      return v;
  }
}
class Main {
  constructor() {
    this.pathMapping = new Map();
    this.router = new Router({
      prefix: '/serve'
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
    console.log('this.pathMapping>>', this.pathMapping)

    for (let [k, v] of this.pathMapping) {
      if (k.startsWith('POST')) {
        const path = k.slice(5);
        this.router.post(path, function (ctx, next) {
          ctx.state = 200;
          let vk = keyDataFac(path, v);
          ctx.response.body = JSON.stringify(v);
        });
      }
    }
    return this.router.routes();
  }

}

module.exports = new Main();