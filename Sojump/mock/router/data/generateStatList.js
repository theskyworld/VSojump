/**
 * @description 生成当前问卷的答卷列表数据
 *              一份问卷(id)可以对应一份答卷(id)或多份答卷(id)
 *              每份答卷中的每个答案对应当前问卷中的每个问题(组件,id)，由此每个组件的id作为键名，对应的答案值作为键值来组成一个对象
 */
const Random = require("mockjs").Random;
const generateComponentList = require("./generateComponentList");


function generateStatList(length = 10) {
    const res = [];
    const componentList = generateComponentList();
    for (let i = 0; i < length; i++) {
        const answer = {
            _id: Random.id(),
        };

        componentList.forEach(c => {
            const { fe_id, type, props } = c;
            // 根据type的不同值，来随机生成不同的答案，并将该答案作为键值，fe_id作为键名存储到当前的answer对象中
            switch (type) {
                case "questionInput":
                    answer[fe_id] = Random.title().slice(0, 10);
                    break;
                case "questionTextarea":
                    answer[fe_id] = Random.title().slice(0, 10);
                    break;
                case "questionRadio":
                    answer[fe_id] = props.options[Math.floor(Math.random() * props.options.length)].text;
                    break;
                case "questionCheckbox":
                    answer[fe_id] = `${props.list[0].text},${props.list[1].text}`;
                    break;
            }
        });

        res.push(answer);
    }

    return res;
}


module.exports = generateStatList;