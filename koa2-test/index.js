const Koa = require("koa")
const staticServer = require("koa-static")
const app = module.exports = new Koa()
// app.use(staticServer(__dirname , '/views'));
app.use(staticServer(__dirname + "/dist", { extensions: ["html"] }))

// app.use(ctx => {
//   const url = ctx.url == '/'  ?  '/index.html' : ctx.url
//   const fileType = path.extname( url ).slice(1);
//       if (fileType ==='html') {
//       ctx.response.type = 'html';
//       ctx.response.body = fs.createReadStream('index.html');
//   } else if  (fileType ==='css') {
//       ctx.response.type = 'css';
//       ctx.response.body = fs.createReadStream('index.css');
//   } else  if  (fileType ==='jpg')  {
//       ctx.response.type = 'image/jpg';
//       ctx.response.body = fs.createReadStream('skills.jpg');
//   } else {
//           ctx.response.body = '文件不存在';
//       }
// });




if (!module.parent) {
  app.listen(3000, function () {
    console.log("koa server running at port 3000");
  })
}