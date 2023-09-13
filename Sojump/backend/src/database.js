const mysql = require('mysql');
const userInfoConfig = require('../database_config').userinfoDB;
const questionConfig = require('../database_config').questionDB;

// 操作sql_sojump_userinfo数据库
const userinfoDatabase = (sql, sqlParams) => {
    sqlParams = sqlParams || [];
    return new Promise((resolve, reject) => {
        const pool = mysql.createPool(userInfoConfig);
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                console.log(`database : ${userInfoConfig.database} connected succeed!`);
                connection.query(sql, sqlParams, (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                        connection.destroy();
                    }
                    connection.release();
                });
            }
        })
    })
};


// 操作sql_sojump_question数据库
const questionDatabase = (sql, sqlParams) => {
    sqlParams = sqlParams || [];
    return new Promise((resolve, reject) => {
        const pool = mysql.createPool(questionConfig);
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                console.log(`database : ${questionConfig.database} connected succeed!`);
                connection.query(sql, sqlParams, (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                        connection.destroy();
                    }
                    connection.release();
                });
            }
        })
    })
};

exports.database = [
    userinfoDatabase,
    questionDatabase
]