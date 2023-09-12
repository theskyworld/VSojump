/** 
 * @description 存储/获取用户token
 * @author tsw
 */

import { TOKEN_KEY } from "../ts/constants";


export function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}