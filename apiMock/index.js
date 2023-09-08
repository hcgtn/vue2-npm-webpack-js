const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const Main = require('./main');
const serve = require('koa-static')
console.log(__dirname)

const app = new Koa();
app.use(bodyparser())
app.use(serve(__dirname + "/dist", { extensions: ["html"] }))
const loadCon = async () => {
  const routers = await Main.init();
  return routers;
}

loadCon().then(res => {
  app.use(res);
  app.listen(4355);
  console.log('linsten: 4355');
});