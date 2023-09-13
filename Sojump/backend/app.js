const express = require("express");
const { database } = require("./src/database");
const { setToken, verifyToken } = require("./src/token");


const app = express();
const port = 5003;

// 操作sql_sojump_userinfo数据库
const userinfoDatabase = database[0];
// 操作sql_sojump_question数据库
const questionDatabase = database[1];
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
        // 获取前端发送过来的要被校验的token
        const authorization = req.headers['authorization'];
        // 用户未登录
        if (!authorization) {
            return resp.status(402).send("用户未登录!");
        } else {
            // 校验token
            verifyToken(authorization).then(data => {
                req.data = data;
                return next();
            }).catch(err => {
                // 登录超时
                if (err.message === `jwt expired`) {
                    return resp.status(401).send("用户登录超时!");
                } else {
                    return resp.status(402).send("用户未登录!");
                }
            })
        }

    }

})




app.get("/", async (req, resp) => {
    resp.send({
        msg: "hello world"
    })
})


// question

// 获取单个问卷
app.get('/api/question/:id', (req, resp) => {
    let { id } = req.params;
    // qid : 前端问卷的id
    // 对于isDeleted、isPublished、isStar，数据库中返回的值为'1'或者'0'，对应转换为true或者false之后返回给前端
    // 对于c.components，默认返回给前端的值应为[]
    const sql = `SELECT 
                    qid,
                    title,
                    description,
                    js,
                    css,
                    isDeleted,
                    isPublished,
                    isStar,
                    c.components
                FROM question_info i
                JOIN question_components c
                USING(components_id)
                WHERE qid = '${id}';`;
    questionDatabase(sql).then(
        res => {
            if (!res.length) {
                // 返回问卷未找到
                resp.status(402).send({
                    errno: 1,
                    msg: "问卷未找到!"
                })
            } else {
                const question = JSON.parse(JSON.stringify(res))[0];
                question.isDeleted = Boolean(question.isDeleted);
                question.isPublished = Boolean(question.isPublished);
                question.isStar = Boolean(question.isStar);
                question.components = JSON.parse(question.components ? question.components : []);
                resp.status(200).send({
                    errno: 0,
                    data: {
                        id: question.qid,
                        ...question,
                    }
                })
            }
        }).catch(err => {
            resp.status(402).send({
                errno: 1,
                msg: "问卷未找到!" + err
            })
        })
});

// 创建问卷
// 对应创建新的qid和components_id并添加至数据库中之后将qid向前端返回
app.post('/api/question', async (req, resp) => {
    // 创建新的qid
    const qid = Math.random().toString(36).substr(2, 16);
    const curQidIsExistSql = `SELECT * FROM question_info WHERE qid = '${qid}'`;
    questionDatabase(curQidIsExistSql).then(
        async (res) => {
            // 确保当前qid在数据库中不存在
            if (!res.length) {
                // 向数据库中添加qid和对应的components_id
                const components_id = Math.random().toString(36).substr(2, 16);
                const insertQidSql = `INSERT INTO question_info(qid, components_id)
        VALUES('${qid}', '${components_id}');`;
                const insertComponentsIdSql = `INSERT INTO question_components(components_id)
        VALUES('${components_id}');`
                await questionDatabase(insertQidSql);
                await questionDatabase(insertComponentsIdSql);
                // 向前端返回qid
                resp.status(200).send({
                    errno: 0,
                    data: {
                        id: qid,
                    }
                })
            } else {
                resp.send({
                    errno: 2,
                    msg: "不能重复创建问卷!"
                })
            }
        }
    ).catch(err => {
        resp.send({
            errno: 3,
            msg: '创建问卷失败!' + err
        })
    })


});

// 修改问卷
// 对新创建或者已创建的问卷进行修改
app.patch('/api/question/:id', async (req, resp) => {
    const { id } = req.params;
    const { title, description, js, css, components = [] } = req.body;
    const findTargetComponentSql = `SELECT * FROM question_info WHERE qid = '${id}'`;

    questionDatabase(findTargetComponentSql).then(
        async (res) => {
            if (res.length) {
                // 更新question_info
                if (title && title !== undefined) {
                    updateQuestionInfo()
                    const sql = `UPDATE question_info SET title = '${title}' WHERE (qid = '${id}');`;
                    await questionDatabase(sql);
                };
                if (description && description !== undefined) {
                    const sql = `UPDATE question_info SET description = '${description}' WHERE (qid = '${id}');`;
                    await questionDatabase(sql);
                };
                if (js && js !== undefined) {
                    const sql = `UPDATE question_info SET js = '${js}' WHERE (qid = '${id}');`;
                    await questionDatabase(sql);
                };
                if (css && css !== undefined) {
                    const sql = `UPDATE question_info SET css = '${css}' WHERE (qid = '${id}');`;
                    await questionDatabase(sql);
                };
                if (req.body.isDeleted !== undefined) {
                    const isDeleted = req.body.isDeleted ? 1 : 0;
                    const sql = `UPDATE question_info SET isDeleted = '${isDeleted}' WHERE (qid = '${id}');`;
                    await questionDatabase(sql);
                };
                if (req.body.isPublished !== undefined) {
                    const isPublished = req.body.isPublished ? 1 : 0;
                    const sql = `UPDATE question_info SET isPublished = '${isPublished}' WHERE (qid = '${id}');`;
                    await questionDatabase(sql);
                };
                if (req.body.isStar !== undefined) {
                    const isStar = req.body.isStar ? 1 : 0;
                    const sql = `UPDATE question_info SET isStar = '${isStar}' WHERE (qid = '${id}');`;
                    await questionDatabase(sql);
                }

                // 更新question_components
                const components_id = JSON.parse(JSON.stringify(res))[0].components_id;
                const sql2 = `UPDATE question_components
                              SET components = '${components.length ? JSON.stringify(components) : JSON.stringify([])}'
                              WHERE (components_id = '${components_id}');
                            `
                await questionDatabase(sql2);
                // }
                resp.status(200).send({
                    errno: 0,
                })
            } else {
                resp.send({
                    errno: 1,
                    msg: "问卷未找到!"
                })
            }
        }
    ).catch(err => {
        resp.send({
            errno: 1,
            msg: "修改问卷失败!" + err
        })
    })
});

// 获取问卷列表
app.get('/api/question-list', async (req, resp) => {
    // 1.获取所有问卷
    // isStar、isDeleted值均为undefined
    // `SELECT * FROM question_info WHERE title LIKE '%${keyword}%' AND isDeleted = '0'`;

    // 2.获取星标问卷
    // isStar值为true,isDeleted值为undefined
    // `SELECT * FROM question_info WHERE title LIKE '%${keyword}%' AND isStar = '1' AND isDeleted = '0'`;

    // 3.获取回收站问卷
    // isDeleted值为true,isStar值为undefined
    // `SELECT * FROM question_info WHERE title LIKE '%${keyword}%' AND isDeleted = '1`;



    const { keyword = '', page = 1, perPageSize = 10, isStar, isDeleted = 0 } = req.query;

    const allQuestionListSql = `SELECT * FROM question_info WHERE title LIKE '%${keyword}%' AND isDeleted = '0'`;
    const starQuestionListSql = `SELECT * FROM question_info WHERE title LIKE '%${keyword}%' AND isStar = '1' AND isDeleted = '0'`;
    const trashQuestionListSql = `SELECT * FROM question_info WHERE title LIKE '%${keyword}%' AND isDeleted = '1'`;

    let finalSql;
    if (!isStar && !isDeleted) {
        finalSql = allQuestionListSql;
    } else if (isStar && !isDeleted) {
        finalSql = starQuestionListSql;
    } else if (!isStar && isDeleted) {
        finalSql = trashQuestionListSql;
    }

    questionDatabase(finalSql).then(
        async (res) => {
            if (res.length) {
                const componentList = JSON.parse(JSON.stringify(res));
                // 根据每个component的components_id来获取对应的components
                // 只获取当前页对应的内容
                const startIndex = page === 1 ? 0 : perPageSize * (page - 1);
                let resComponentList = componentList.slice(startIndex, startIndex + perPageSize);
                for (let i = 0; i < resComponentList.length; i++) {
                    const c = resComponentList[i];
                    // 将布尔值中的0转为false，1转为true,修改前端问卷id的值为qid的值，用于以后寻找或修改该问卷
                    c.isDeleted = Boolean(c.isDeleted);
                    c.isPublished = Boolean(c.isPublished);
                    c.isStar = Boolean(c.isStar);
                    c.id = c.qid;
                    // 获取当前问卷的components
                    const components_id = c.components_id;
                    const sql2 = `SELECT * FROM question_components WHERE components_id = '${components_id}'`;
                    await questionDatabase(sql2).then(
                        res => {
                            if (res.length) {
                                c.components = JSON.parse(JSON.parse(JSON.stringify(res))[0].components);
                            }
                        }
                    );
                }
                resp.status(200).send(
                    {
                        errno: 0,
                        data: {
                            list: resComponentList,
                            total: componentList.length
                        }
                    }
                )
            } else {
                resp.send({
                    errno: 0,
                    data: {
                        list: [],
                        total: 0,
                    }
                })
            }
        }
    ).catch(err => {
        resp.send({
            errno: 1,
            msg: "获取问卷列表失败!" + err
        })
    })
})

// 复制问卷
// 后端只需返回复制后新问卷的id
app.post('/api/question/duplicate/:id', (req, resp) => {
    const qid = Math.random().toString(36).substr(2, 16);
    resp.status(200).send({
        errno: 0,
        data: {
            id: qid,
        }
    })
});

// 批量彻底删除问卷
app.delete('/api/question', async (req, resp) => {
    let { ids } = req.body;
    // 使用上面的ids进行mysql中的批量删除
    // 需要删除question_info和question_components中的对应内容

    ids.forEach(async id => {
        try {
            const deleteFromQuestionInfoSql = `DELETE FROM question_info WHERE qid = '${id}'`;
            const findComponentsIdSql = `SELECT components_id FROM question_info WHERE qid = '${id}'`;
            let components_id;
            await questionDatabase(findComponentsIdSql).then(
                res => {
                    if (res.length) {
                        components_id = JSON.parse(JSON.stringify(res))[0].components_id
                    }
                }
            )
            const deleteFromQuestionComponentsSql = `DELETE FROM question_components WHERE components_id = '${components_id}'`;
            questionDatabase(deleteFromQuestionInfoSql);
            questionDatabase(deleteFromQuestionComponentsSql);
        } catch {
            resp.send({
                erron: 3,
                msg: `删除问卷${id}失败!`
            })
        }
    });

    resp.status(200).send({
        errno: 0,
    })
})







// userinfo

// 用户登录
app.post("/api/user/login", async (req, resp) => {
    const params = req.body;
    const sqlParam = params.username;
    const sql = `SELECT * FROM userinfo WHERE uname = '${sqlParam}'`;
    userinfoDatabase(sql, sqlParam).then(
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
    const sql_find_user = `SELECT id FROM userinfo WHERE uname = '${params.username}'`;
    const sql_add_user = `INSERT INTO userinfo (uname,upassword) VALUES ('${params.username}','${params.password}')`;

    userinfoDatabase(sql_find_user, params.username).then(
        res => {
            if (res.length) {
                resp.writeHead(801, 'username is already exist', { 'content-type': 'text/plain' })
                resp.end()
            } else {
                userinfoDatabase(sql_add_user).then(
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
    const { username } = req.query;
    const sql = `SELECT * FROM userinfo WHERE uname = '${username}'`;
    userinfoDatabase(sql, username).then(
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


// question










app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})