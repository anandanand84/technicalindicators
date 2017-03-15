var Koa = require('koa');
var app = new Koa();
var staticFolder = require('koa-static');
app.use(staticFolder('.', {}));
app.listen(5444);
console.log('Server started');
console.log('http://localhost:5444/testdocs.html');