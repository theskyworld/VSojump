const express = require("express");
const { database } = require("./src/database");
const { setToken, verifyToken } = require("./src/token");


const app = express();
const port = 5003;
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// 统一校验token，在例如获取用户信息时使用
app.use((req, resp, next) => {
    const location = req.url;
    // 以下路由无需进行校验
    const whiteList = [
        '/api/user/login',
        '/api/user/register'
    ]
    if (whiteList.includes(location)) {
        return next();
    } else {
        // 获取前端发送过来的要用于校验的token
        const authorization = req.headers['authorization']
        if (!authorization) {
            return resp.status(402).send("用户未登录!");
        } else {
            verifyToken(authorization).then(data => {
                req.data = data;
                return next();
            }).catch(err => {
                if (err.message === `jwt expired`) {
                    return resp.status(401).send("用户登录超时!");
                } else {
                    return resp.status(402).send("用户未登录!");
                }
            })
        }

    }

})




app.get("/", (req, resp) => {
    resp.send({
        msg: "hello world"
    })
})

// 用户登录
app.post("/api/user/login", async (req, resp) => {
    const params = req.body;
    console.log("🚀 ~ file: app.js:19 ~ app.post ~ params:", params)
    const sqlParam = params.username;
    const sql = `SELECT * FROM userinfo WHERE uname = '${sqlParam}'`;
    database(sql, sqlParam).then(
        res => {
            if (res.length) {
                const userinfo = JSON.parse(JSON.stringify(res))[0];
                const { upassword } = userinfo;
                if (upassword === params.password) {
                    setToken(params.username).then(token => {
                        resp.status(200).send({
                            errno: 0,
                            data: {
                                token,
                                userinfo
                            }
                        })
                    })
                } else {
                    resp.writeHead(801, 'Current password does not match', { 'content-type': 'text/plain' })
                    resp.end()
                }
            } else {
                resp.writeHead(801, 'username is not found', { 'content-type': 'text/plain' })
                resp.end()
            }
        }
    )
})

// 用户注册
app.post("/api/user/register", async (req, resp) => {
    const params = req.body;
    console.log("🚀 ~ file: app.js:89 ~ app.post ~ params:", params)
    const sql_find_user = `SELECT id FROM userinfo WHERE uname = '${params.username}'`;
    const sql_add_user = `INSERT INTO userinfo (uname,upassword) VALUES ('${params.username}','${params.password}')`;

    database(sql_find_user, params.username).then(
        res => {
            if (res.length) {
                resp.writeHead(801, 'username is already exist', { 'content-type': 'text/plain' })
                resp.end()
            } else {
                database(sql_add_user).then(
                    res => {
                        resp.status(200).send({
                            errno: 0,
                        })
                    }
                )
            }
        }
    )
});

// 获取用户信息
app.get("/api/user/info", async (req, resp) => {
    const {username} = req.query;
    const sql = `SELECT * FROM userinfo WHERE uname = '${username}'`;
    database(sql, username).then(
        res => {
            if (res.length) {
                resp.status(200).send({
                    errno: 0,
                    data: res[0]
                })
            } else {
                resp.status(801, 'username is not found', { 'content-type': 'text/plain' })
                resp.end()
            }
        }
    )
})










app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})