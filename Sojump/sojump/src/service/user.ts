import instance, { ResponseData } from "./base";
 

// 获取用户信息
export async function getUserInfoService() : Promise<ResponseData> {
    const data = await instance.get("/api/user/info");
    return data;
}


// 注册
export async function registerUserService(username: string, password: string) : Promise<ResponseData> {
    const data = await instance.post("/api/user/register", { username, password });
    return data;
}

// 登录
export async function loginUserService(username: string, password: string): Promise<ResponseData> {
    const data = await instance.post("/api/user/login", { username, password });
    return data;
}