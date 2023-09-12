/**
 * @author tsw
 * @description 生成任意长度的随机问卷数据列表
 */

const Random = require("mockjs").Random


function getRandomQuestionList(length = 10, isDeleted = false, isStar = undefined) {
    const list = []
    for (let i = 0; i < length; i++) {
        list.push({
            id: Random.id(),
            title: Random.title(),
            isPublished: Random.boolean(),
            isStar: isStar || Random.boolean(),
            answerCount: Random.integer(50, 100),
            createTime: Random.datetime(),
            isDeleted, // 假删除，问卷列表问卷中的删除按钮控制该值的真假
        })
    }
    // 返回用于回收站中展示的数据列表
    if (isDeleted) {
        return list.filter(question => question.isDeleted);
        // 返回用于标星问卷中展示的数据列表
    } else if (isStar) {
        return list.filter(question => question.isStar);
        // 返回用于我的问卷中展示的数据列表
    } else {
        return list.filter(question => !question.isDeleted);
    }
}

module.exports = getRandomQuestionList;