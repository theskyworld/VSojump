module.exports = {
    // 操作sql_sojump_userinfo数据库
    userinfoDB: {
        database: 'sql_sojump_userinfo',
        user: "root",
        password: "5497237"
    },
    // 操作sql_sojump_question数据库
    questionDB: {
        database: 'sql_sojump_question',
        user: "root",
        password: "5497237"
    },
    server: {
        // mysql服务器端口
        port: 3306,
        jwt: {
            signKey: 'somekey',
            expiresIn: 60 * 60 * 24 * 7

        }
    }
}