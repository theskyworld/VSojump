const generateStatList = require('./data/generateStatList');
const Random = require("mockjs").Random;

module.exports = [
    {
        // 根据问卷的id，获取该问卷的所有答卷
        url: "/api/stat/:questionId",
        method: "get",
        response() {
            return {
                errno: 0,
                data: {
                    total: 100,
                    list : generateStatList(15),
                }
            }
        }
    },
    // 获取当前问卷的答卷中单选和多选选项的选择统计结果，用于统计图表展示
    {
        url : "/api/stat/:questionId/:componentId",
        method: "get",
        response() {
            return {
                errno: 0,
                data: {
                    stat: [
                        { name: "选项一", count: 20 },
                        { name: "选项二", count: 10 },
                        { name: "选项三", count: 15 },
                    ]
                }
            }
        }
    }
]