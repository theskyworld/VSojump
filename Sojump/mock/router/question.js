const Random = require("mockjs").Random;
const getRandomQuestionList = require('./data/questionList');
const generateComponentList = require("./data/generateComponentList");


module.exports = [
    // 获取单个问卷
    {
        url: "/api/question/:id",
        method: "get",
        response() {
            return {
                errno: 0,
                data: {
                    id: Random.id(),
                    title: `问卷标题-${Random.integer()}`,
                    desc: "问卷描述...",
                    js: "",
                    css: "",
                    isDeleted : false,
                    isPublished: true,
                    // 当前问卷中所包含的组件列表属性
                    components: generateComponentList()
                }
            }
        }
    },

    // 创建问卷
    {
        url: "/api/question",
        method: "post",
        response() {
            return {
                errno: 0,
                data: {
                    id: Random.id(),
                }
            }
        }
    },
    // 获取(查询)问卷列表
    {
        url: "/api/question-list",
        method: "get",
        response(ctx) {
            const { url, query } = ctx;
            const isStar = url.includes("isStar=true") ? true : undefined;
            const isDeleted = url.includes("isDeleted=true") ? true : false;

            const { keyword = "", page = 1, perPageSize = 10 } = query;

            return {
                errno: 0,
                data: {
                    // 返回当前页的列表数据
                    list: getRandomQuestionList(perPageSize, isDeleted, isStar),
                    total: 100, // 列表数据总数，用于分页
                }
            }
        }
    },
    // 更新问卷
    {
        url: "/api/question/:id",
        method: "patch",
        response() {
            return {
                errno: 0,
            }
        }
    },
    // 复制问卷
    {
        url: "/api/question/duplicate/:id",
        method: "post",
        response() {
            return {
                errno: 0,
                data: {
                    id: Random.id(),
                }
            }
        }
    },
    // 批量彻底删除
    {
        url: "/api/question",
        method: "delete",
        response() {
            return {
                errno: 0,
            }
        }
    }
]