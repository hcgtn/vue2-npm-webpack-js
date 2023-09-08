const Koa = require('koa');
const logger = require('koa-logger');
const app = module.exports = new Koa();
const Router = require('koa-router');

app.use(logger());
const router = new Router();

router
  .get(/.*/, (ctx, next) => {
    ctx.body = 'get';
  })
  .post(/.*/, (ctx, next) => {
    ctx.body = 'post';
  })
  .put('/users/:id', (ctx, next) => {
    // ...
  })
  .del('/users/:id', (ctx, next) => {
    // ...
  })
  .all('/users/:id', (ctx, next) => {
    // ...
  });
app.use(router.routes());
app.listen(3000, () => {
  console.log('koa mock collect Server run in port:3000 ~');
});
