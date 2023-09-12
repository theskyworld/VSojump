/**
 * @description 用户信息相关的路由配置
 */

const Random = require("mockjs").Random;


module.exports = [
    // 获取用户信息
    {
        url: "/api/user/info",
        method: "get",
        response() {
            return {
                errno: 0,
                data: {
                    username : Random.name(),
                }
            }
        }
    },
    // 注册
    {
        url: "/api/user/register",
        method: "post",
        response() {
            return {
                errno : 0,
            }
        }
    },
    // 登录
    {
        url: "/api/user/login",
        method: "post",
        response() {
            return {
                errno: 0,
                data: {
                    token : Random.word(20),
                }
            }
        }
    }
   
]