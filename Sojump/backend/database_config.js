module.exports = {
    db: {
        database: 'sql_sojump_userinfo',
        user: "root",
        password: "5497237"
    },
    server: {
        port: 3306,
        jwt: {
            signKey: 'somekey',
            expiresIn: 60 * 60 * 24 * 7

        }
    }
}