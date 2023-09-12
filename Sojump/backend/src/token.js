const jwt = require("jsonwebtoken");
const { signKey, expiresIn } = require("../database_config").server.jwt;


exports.setToken = async (username) => {
    return new Promise(resolve => {
        const token = jwt.sign({ username }, signKey, { expiresIn });
        resolve(token);
    })
}

exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, signKey, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
    
}