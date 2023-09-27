const express = require("express");
const { database } = require("./src/database");
const { setToken, verifyToken } = require("./src/token");

const app = express();
const port = 5003;

// 操作sql_sojump_userinfo数据库
const userinfoDatabase = database[0];
// 操作sql_sojump_question数据库
const questionDatabase = database[1];
// 操作sql_sojump_answer数据库
const answerDatabase = database[2];

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

// 统一校验token，在例如获取用户信息时使用
app.use((req, resp, next) => {
  const location = req.url;
  const id = location.split("/")[3];
  // 以下路由无需进行校验
  const whiteList = [
    "/api/user/login",
    "/api/user/register",
    // 匹配获取要填写的问卷路由，不需要进行校验token
    `/api/answer-question/${id}`,
    // 提交答卷
    "/api/answer",
  ];
  if (whiteList.includes(location)) {
    return next();
  } else {
    // 获取前端发送过来的要被校验的token
    const authorization = req.headers["authorization"];
    // 用户未登录
    if (!authorization) {
      return resp.status(507).send({
        errno: 4,
        msg: "用户未登录!",
      });
    } else {
      // 校验token
      verifyToken(authorization)
        .then(data => {
          req.data = data;
          return next();
        })
        .catch(err => {
          // 登录超时
          if (err.message === `jwt expired`) {
            return resp.status(507).send({
              errno: 4,
              msg: "用户登录超时!",
            });
          } else {
            return resp.status(507).send({
              errno: 4,
              msg: "用户未登录!",
            });
          }
        });
    }
  }
});

app.get("/", async (req, resp) => {
  resp.send({
    msg: "hello world",
  });
});

// question

// 获取单个问卷
app.get("/api/question/:id", (req, resp) => {
  let { id } = req.params;
  //   console.log("🚀 ~ file: app.js:67 ~ app.get ~ id:", id);
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
  questionDatabase(sql)
    .then(res => {
      if (!res.length) {
        // 返回问卷未找到
        resp.status(507).send({
          errno: 1,
          msg: "问卷未找到!",
        });
      } else {
        const question = JSON.parse(JSON.stringify(res))[0];
        question.isDeleted = Boolean(question.isDeleted);
        question.isPublished = Boolean(question.isPublished);
        question.isStar = Boolean(question.isStar);
        question.components = JSON.parse(question.components) || [];
        resp.status(200).send({
          errno: 0,
          data: {
            id: question.qid,
            ...question,
          },
        });
      }
    })
    .catch(err => {
      resp.status(507).send({
        errno: 1,
        msg: "问卷未找到!",
      });
    });
});

// 创建问卷
// 对应创建新的qid和components_id并添加至数据库中之后将qid向前端返回
app.post("/api/question", async (req, resp) => {
  // 创建新的qid
  const qid = Math.random().toString(36).substr(2, 16);
  const curQidIsExistSql = `SELECT * FROM question_info WHERE qid = '${qid}'`;
  questionDatabase(curQidIsExistSql)
    .then(async res => {
      // 确保当前qid在数据库中不存在
      if (!res.length) {
        // 向数据库中添加qid和对应的components_id
        const components_id = Math.random().toString(36).substr(2, 16);
        const insertQidSql = `INSERT INTO question_info(qid, components_id)
        VALUES('${qid}', '${components_id}');`;
        const insertComponentsIdSql = `INSERT INTO question_components(components_id)
        VALUES('${components_id}');`;
        await questionDatabase(insertQidSql);
        await questionDatabase(insertComponentsIdSql);
        // 向前端返回qid
        resp.status(200).send({
          errno: 0,
          data: {
            id: qid,
          },
        });
      } else {
        resp.status(507).send({
          errno: 2,
          msg: "不能重复创建问卷!",
        });
      }
    })
    .catch(err => {
      resp.status(507).send({
        errno: 3,
        msg: "创建问卷失败!",
      });
    });
});

// 修改问卷
// 对新创建或者已创建的问卷进行修改
app.patch("/api/question/:id", async (req, resp) => {
  const { id } = req.params;
  const { title, description, js, css, components = [] } = req.body;
  const findTargetComponentSql = `SELECT * FROM question_info WHERE qid = '${id}'`;

  questionDatabase(findTargetComponentSql)
    .then(async res => {
      if (res.length) {
        // 更新question_info
        if (title && title !== undefined) {
          const sql = `UPDATE question_info SET title = '${title}' WHERE (qid = '${id}');`;
          await questionDatabase(sql);
        }
        if (description && description !== undefined) {
          const sql = `UPDATE question_info SET description = '${description}' WHERE (qid = '${id}');`;
          await questionDatabase(sql);
        }
        if (js && js !== undefined) {
          const sql = `UPDATE question_info SET js = '${js}' WHERE (qid = '${id}');`;
          await questionDatabase(sql);
        }
        if (css && css !== undefined) {
          const sql = `UPDATE question_info SET css = '${css}' WHERE (qid = '${id}');`;
          await questionDatabase(sql);
        }
        if (req.body.isDeleted !== undefined) {
          const isDeleted = req.body.isDeleted ? 1 : 0;
          const sql = `UPDATE question_info SET isDeleted = '${isDeleted}' WHERE (qid = '${id}');`;
          await questionDatabase(sql);
        }
        if (req.body.isPublished !== undefined) {
          const isPublished = req.body.isPublished ? 1 : 0;
          const sql = `UPDATE question_info SET isPublished = '${isPublished}' WHERE (qid = '${id}');`;
          await questionDatabase(sql);
        }
        if (req.body.isStar !== undefined) {
          const isStar = req.body.isStar ? 1 : 0;
          const sql = `UPDATE question_info SET isStar = '${isStar}' WHERE (qid = '${id}');`;
          await questionDatabase(sql);
        }

        // 更新question_components
        const components_id = JSON.parse(JSON.stringify(res))[0].components_id;
        const sql2 = `UPDATE question_components
                              SET components = '${
                                components.length
                                  ? JSON.stringify(components)
                                  : JSON.stringify([])
                              }'
                              WHERE (components_id = '${components_id}');
                            `;
        await questionDatabase(sql2);
        // }
        resp.status(200).send({
          errno: 0,
        });
      } else {
        resp.status(507).send({
          errno: 1,
          msg: "问卷未找到!",
        });
      }
    })
    .catch(err => {
      resp.status(507).send({
        errno: 1,
        msg: "修改问卷失败!",
      });
    });
});

// 获取问卷列表
app.get("/api/question-list", async (req, resp) => {
  // 1.获取所有问卷
  // isStar、isDeleted值均为undefined
  // `SELECT * FROM question_info WHERE title LIKE '%${keyword}%' AND isDeleted = '0'`;

  // 2.获取星标问卷
  // isStar值为true,isDeleted值为undefined
  // `SELECT * FROM question_info WHERE title LIKE '%${keyword}%' AND isStar = '1' AND isDeleted = '0'`;

  // 3.获取回收站问卷
  // isDeleted值为true,isStar值为undefined
  // `SELECT * FROM question_info WHERE title LIKE '%${keyword}%' AND isDeleted = '1`;

  const {
    keyword = "",
    page = 1,
    perPageSize = 10,
    isStar,
    isDeleted = 0,
  } = req.query;

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

  questionDatabase(finalSql)
    .then(async res => {
      if (res.length) {
        const componentList = JSON.parse(JSON.stringify(res));
        // 根据每个component的components_id来获取对应的components
        // 只获取当前页对应的内容
        const startIndex = page === 1 ? 0 : perPageSize * (page - 1);
        let resComponentList = componentList.slice(
          startIndex,
          startIndex + perPageSize
        );
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
          await questionDatabase(sql2).then(res => {
            if (res.length) {
              c.components = JSON.parse(
                JSON.parse(JSON.stringify(res))[0].components
              );
            }
          });
        }
        resp.status(200).send({
          errno: 0,
          data: {
            list: resComponentList,
            total: componentList.length,
          },
        });
      } else {
        resp.status(200).send({
          errno: 0,
          data: {
            list: [],
            total: 0,
          },
        });
      }
    })
    .catch(err => {
      // resp.send({
      //   errno: 1,
      //   msg: "获取问卷列表失败!",
      // });
    });
});

// 复制问卷
// 后端在数据库中新建一个原问卷的复制版本后，返回新问卷的id
app.post("/api/question/duplicate/:id", (req, resp) => {
  const qid = Math.random().toString(36).substr(2, 16);
  const curQidIsExistSql = `SELECT * FROM question_info WHERE qid = '${qid}'`;
  questionDatabase(curQidIsExistSql)
    .then(async res => {
      // 确保当前qid在数据库中不存在
      if (!res.length) {
        // 向数据库中添加qid和对应的components_id
        const components_id = Math.random().toString(36).substr(2, 16);
        const insertQidSql = `INSERT INTO question_info(qid, components_id)
        VALUES('${qid}', '${components_id}');`;
        const insertComponentsIdSql = `INSERT INTO question_components(components_id)
        VALUES('${components_id}');`;
        await questionDatabase(insertQidSql);
        await questionDatabase(insertComponentsIdSql);
        // 向前端返回qid
        resp.status(200).send({
          errno: 0,
          data: {
            id: qid,
          },
        });
      } else {
        resp.status(507).send({
          errno: 2,
          msg: "不能重复创建问卷!",
        });
      }
    })
    .catch(err => {
      resp.status(507).send({
        errno: 3,
        msg: "复制问卷失败!",
      });
    });
});

// 批量彻底删除问卷
app.delete("/api/question", async (req, resp) => {
  let { ids } = req.body;
  // 使用上面的ids进行mysql中的批量删除
  // 需要删除question_info和question_components中的对应内容

  ids.forEach(async id => {
    try {
      const deleteFromQuestionInfoSql = `DELETE FROM question_info WHERE qid = '${id}'`;
      const findComponentsIdSql = `SELECT components_id FROM question_info WHERE qid = '${id}'`;
      let components_id;
      await questionDatabase(findComponentsIdSql).then(res => {
        if (res.length) {
          components_id = JSON.parse(JSON.stringify(res))[0].components_id;
        }
      });
      const deleteFromQuestionComponentsSql = `DELETE FROM question_components WHERE components_id = '${components_id}'`;
      const deleteFromAnswerInfoSql = `DELETE FROM answer_info WHERE qid = '${id}'`;
      questionDatabase(deleteFromQuestionInfoSql);
      questionDatabase(deleteFromQuestionComponentsSql);
      questionDatabase(deleteFromAnswerInfoSql);
    } catch {
      resp.status(507).send({
        erron: 3,
        msg: `删除问卷${id}失败!`,
      });
    }
  });

  resp.status(200).send({
    errno: 0,
  });
});

// userinfo

// 用户登录
app.post("/api/user/login", async (req, resp) => {
  const params = req.body;
  const {username, password } = params;
  console.log(username, password);
  const sql = `SELECT * FROM userinfo WHERE uname = '${username}'`;
  userinfoDatabase(sql, username).then(res => {
    if (res.length) {
      const userinfo = JSON.parse(JSON.stringify(res))[0];
      const { upassword } = userinfo;
      if (upassword === password) {
        setToken(username).then(token => {
          resp.status(200).send({
            errno: 0,
            data: {
              token,
              userinfo,
            },
          });
        });
      } else {
        resp.status(507).send({
          errno: 1,
          msg: "密码错误!",
        });
      }
    } else {
      resp.status(507).send({
        errno: 1,
        msg: "用户未注册!",
      });
    }
  });
});

// 用户注册
app.post("/api/user/register", async (req, resp) => {
  const params = req.body;
  const sql_find_user = `SELECT id FROM userinfo WHERE uname = '${params.username}'`;
  const sql_add_user = `INSERT INTO userinfo (uname,upassword) VALUES ('${params.username}','${params.password}')`;

  userinfoDatabase(sql_find_user, params.username).then(async res => {
    if (res.length) {
      resp.status(507).send({
        errno: 1,
        msg: "当前用户已注册,请立即登录或更改用户名注册!",
      })
    } else {
      await userinfoDatabase(sql_add_user);
      await userinfoDatabase(sql_set_uid);
      resp.status(200).send({
        errno: 0,
        data: {
          uid,
        },
      });
    }
  });
});

// 获取用户信息
app.get("/api/user/info", async (req, resp) => {
  const { username } = req.query;
  const sql = `SELECT * FROM userinfo WHERE uname = '${username}'`;
  userinfoDatabase(sql, username).then(res => {
    if (res.length) {
      resp.status(200).send({
        errno: 0,
        data: res[0],
      });
    } else {
      resp.status(507).send({
        errno: 1,
        msg: "用户未注册!",
      });
    }
  });
});

// answer
// 获取要进行填写的问卷
app.get("/api/answer-question/:id", async (req, resp) => {
  let { id } = req.params;
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
  questionDatabase(sql)
    .then(res => {
      if (!res.length) {
        // 返回问卷未找到
        resp.status(507).send({
          errno: 1,
          msg: "问卷未找到!",
        });
      } else {
        const question = JSON.parse(JSON.stringify(res))[0];
        question.isDeleted = Boolean(question.isDeleted);
        question.isPublished = Boolean(question.isPublished);
        if (!question.isPublished) {
          resp.status(507).send({
            errno: 4,
            msg: "当前问卷未发布！",
          });
        }
        question.isStar = Boolean(question.isStar);
        question.components = JSON.parse(
          question.components ? question.components : []
        );
        resp.status(200).send({
          errno: 0,
          data: {
            id: question.qid,
            ...question,
          },
        });
      }
    })
    .catch(err => {
      resp.status(507).send({
        errno: 1,
        msg: "问卷未找到!",
      });
    });
});

// 收集（提交）答卷
app.post("/api/answer", async (req, resp) => {
  const answerInfo = JSON.parse(req.body);
  const { questionId, answerList } = answerInfo;
  const sql = `INSERT INTO answer_info(question_id, answer_list)
                VALUES ('${questionId}', JSON_ARRAY('${JSON.stringify(
    answerList
  )}'))`;
  answerDatabase(sql).then(res => {
    resp.status(200).send({
      errno: 0,
    });
  });
});

// stat 问卷统计
// 获取当前问卷的所有答卷
app.get("/api/stat/:questionId", async (req, resp) => {
  const { questionId } = req.params;
  let { page, pageSize: perPageSize } = req.query;
  page = page - 0;
  perPageSize = perPageSize - 0;
  const sql = `SELECT * FROM answer_info WHERE question_id = '${questionId}'`;

  answerDatabase(sql).then(res => {
    const list = [];
    if (res.length) {
      const answerInfos = JSON.parse(JSON.stringify(res));
      const startIndex = page === 1 ? 0 : perPageSize * (page - 1);
      const resAnswerInfos = answerInfos.slice(
        startIndex,
        startIndex + perPageSize
      );

      resAnswerInfos.forEach(answerInfo => {
        answerInfo.answer_list = JSON.parse(
          JSON.parse(JSON.parse(JSON.stringify(answerInfo)).answer_list)[0]
        );

        const components = {};
        answerInfo.answer_list.forEach((i, index) => {
          // 让componentId的值复原，前端中不需要radio和checkbox
          // 去除掉i.componentId中的radio和checkbox
          if (i.componentId.includes("radio"))
            i.componentId = i.componentId.replace("radio", "");
          if (i.componentId.includes("checkbox"))
            i.componentId = i.componentId.replace("checkbox", "");
          components[i.componentId] = i.value;
        });

        list.push({
          _id: answerInfo.id + "",
          ...components,
        });
      });

      resp.status(200).send({
        errno: 0,
        data: {
          list: list,
          total: answerInfos.length,
        },
      });
    } else {
      resp.status(200).send({
        errno: 0,
        data: {
          list: list,
          total: 0,
        },
      });
    }
  });
});

// 获取当前问卷的答卷中单选和多选选项的选择统计结果，用于统计图表展示
app.get("/api/stat/:questionId/:componentId", async (req, resp) => {
  const { questionId, componentId } = req.params;
  const findQuestionSql = `SELECT * FROM question_info WHERE qid = '${questionId}'`;
  const findAnswerListSql = `SELECT * FROM answer_info WHERE question_id = '${questionId}'`;
  // 如果未找到组件，则返回组件未找到
  questionDatabase(findQuestionSql).then(res => {
    if (!res.length) {
      resp.status(507).send({
        errno: 1,
        msg: "组件未找到!",
      });
    } else {
      answerDatabase(findAnswerListSql).then(async res => {
        if (res.length) {
          const answers = JSON.parse(JSON.stringify(res));
          const answerKindsForRadio = new Map();
          const answerKindsForCheckbox = new Map();
          const stat = [];
          await answers.forEach(ans => {
            ans.answer_list = JSON.parse(
              JSON.parse(JSON.parse(JSON.stringify(ans)).answer_list)[0]
            );

            ans.answer_list.forEach(a => {
              // console.log(a.componentId)
              // 表示要进行数据统计，用于展示统计图的组件
              if (a.componentId.includes("radio")) {
                // 对于单选按钮
                // 单选按钮每个单选按钮组件的值都是单个的，不需要对值进行拆分的处理
                // 使用map统计每个值出现的次数，然后使用当前值出现的总次数 / 总的答卷数量(amount)来计算当前值的百分比
                if (
                  !answerKindsForRadio.has(a.value) &&
                  a.componentId === componentId + "radio" &&
                  a.value
                ) {
                  answerKindsForRadio.set(a.value, 1);
                } else {
                  let lastTimes = answerKindsForRadio.get(a.value);
                  lastTimes += 1;
                  answerKindsForRadio.set(a.value, lastTimes);
                }
              }
              if (
                a.componentId.includes("checkbox") &&
                a.componentId === componentId + "checkbox" &&
                a.value
              ) {
                // 对于多选按钮，将值进行拆分之后进行上述单选按钮相同的操作
                const curValues = a.value.split(",");
                curValues.forEach(v => {
                  if (!answerKindsForCheckbox.has(v)) {
                    answerKindsForCheckbox.set(v, 1);
                  } else {
                    let lastTimes = answerKindsForCheckbox.get(v);
                    lastTimes += 1;
                    answerKindsForCheckbox.set(v, lastTimes);
                  }
                });
              }
            });
          });
          answerKindsForRadio.forEach((v, k) => {
            if (!v) return;
            stat.push({
              name: k,
              count: v,
            });
          });
          answerKindsForCheckbox.forEach((v, k) => {
            if (!v) return;
            stat.push({
              name: k,
              count: v,
            });
          });
          // console.log(stat)
          resp.status(200).send({
            errno: 0,
            data: {
              stat,
            },
          });
        } else {
          resp.status(507).send({
            errno: 1,
            msg: "答卷未找到!",
          });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
