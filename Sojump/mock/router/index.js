const user = require('./user.js');
const question = require("./question.js");
const stat = require('./stat.js');
const answer = require("./answer.js")

const mockList = [
    ...user,
    ...question,
    ...stat,
    ...answer,
]

module.exports = mockList;