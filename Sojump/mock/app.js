const Koa = require("koa");
const Router = require("koa-router");
const mockList = require("./router");

const app = new Koa();
const router = new Router();


function getRes(fn, ctx) {
    return new Promise(resolve => {
        // setTimeout(() => {
            resolve(fn(ctx));
        // }, 1000)
    })
}


mockList.forEach(item => {
    const { url, method, response } = item;
    // 在router中注册所有的请求方法以及其对应的请求url和response
    router[method](url, async (ctx) => {
        // 将当前reponse返回的值赋值给ctx的body属性上
        // 当前端通过对应的method和url请求到该路由时，返回该body
        const res = await getRes(response, ctx);
        ctx.body = res;
    })
})


app.use(router.routes());
app.listen(5002);