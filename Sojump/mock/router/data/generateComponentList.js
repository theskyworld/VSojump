/**
 * @description 生成当前问卷中的组件列表
 */

const Random = require("mockjs").Random;


// 在统计数据页面中下部左中右三栏中获取到的组件的id要是相同唯一的一个id
// 不能在三栏中各栏获取组件时，id不同
function geterateRandomIds(length = 10) {
    const res = [];
    for (let i = 0; i < length; i++) {
        res.push(Random.id());
    }
    return res;
}


function generateComponentList() {
    return [
        // QuestionInfo组件
        {
            fe_id: "c1",
            type: "questionInfo",
            title: "问卷信息",
            isHidden: false,
            isLocked: false,
            props: {
                title: "问卷标题",
                description: "问卷描述..."
            }
        },

        // QuestionTitle组件
        {
            fe_id: "c2",
            type: "questionTitle", // 前后端公用的统一组件类型值
            title: "标题",
            isHidden: false,
            isLocked: false,
            props: { // 对应前端QuestionTitle组件属性
                text: '个人信息调研',
                level: 1,
                isCenter: false
            }
        },
        // QuestionInput组件
        {
            fe_id: "c3",
            type: "questionInput",
            title: "输入框",
            isHidden: false,
            isLocked: false,
            props: { // 对应前端QuestionInput组件属性
                title: "你的姓名",
                placeholder: "请输入姓名..."
            }
        },
        // QuestionInput组件
        {
            fe_id: "c4",
            type: "questionInput",
            title: "输入框",
            isHidden: false,
            isLocked: false,
            props: { // 对应前端QuestionInput组件属性
                title: "你的电话号码",
                placeholder: "请输入电话号码..."
            }
        },
        // QuestionParagraph组件
        {
            fe_id: "c5",
            type: "questionParagraph",
            title: "段落",
            isHidden: false,
            iSLocked: false,
            props: {
                text: "一行段落",
                isCenter: false,
            }
        },
        // QuestionTextarea组件
        {
            fe_id: "c6",
            type: "questionTextarea",
            title: "多行输入框",
            isHidden: false,
            isLocked: false,
            props: { // 对应前端QuestionTextarea组件属性
                title: "你的爱好",
                placeholder: "请输入..."
            }
        },
        // QuestionRadio组件
        {
            fe_id: "c7",
            type: "questionRadio",
            title: "单选",
            isHidden: false,
            isLocked: false,
            props: { // 对应前端QuestionRadio组件属性
                title: "单选标题",
                isVertical: false,
                options: [
                    {
                        id: Random.id(),
                        value: "item1",
                        text: "选项一"
                    },
                    {
                        id: Random.id(),
                        value: "item2",
                        text: "选项二"
                    },
                    {
                        id: Random.id(),
                        value: "item3",
                        text: "选项三"
                    }
                ],
                value: '',
            }
        },
        // QuestionCheckbox组件
        {
            fe_id: "c8",
            type: "questionCheckbox",
            title: "多选",
            isHidden: false,
            isLocked: false,
            props: { // 对应前端QuestionCheckbox组件属性
                title: "多选标题",
                isVertical: false,
                list: [
                    {
                        id: Random.id(),
                        value: "item1",
                        text: "选项一",
                        isChecked: false,
                    },
                    {
                        id: Random.id(),
                        value: "item2",
                        text: "选项二",
                        isChecked: false,
                    },
                    {
                        id: Random.id(),
                        value: "item3",
                        text: "选项三",
                        isChecked: false,
                    }
                ],
                value: '',
            }
        }
    ];
}


module.exports = generateComponentList;