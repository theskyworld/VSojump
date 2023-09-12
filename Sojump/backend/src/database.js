const mysql = require('mysql');
const config = require('../database_config').db;


exports.database = (sql, sqlParams) => {
    sqlParams = sqlParams || [];
    return new Promise((resolve, reject) => {
        const pool = mysql.createPool(config);
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                console.log(`database : ${config.database} connected succeed!`);
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
}