import { UserOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button } from "antd";
import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../assets/ts/constants";
import getUserFromLocalStorage from "../assets/utils/getUserFromLocalStorage";
import { removeToken } from "../assets/utils/userToken";
import { getUserInfoService } from "../service/user";



const UserInfo: FC = () => {
    const username_ = (getUserFromLocalStorage() || { username: "", password: "" }).username;

    const [isLogined, setIsLogined] = useState(false);
    const nav = useNavigate();


    const { data } = useRequest(() => {
        return getUserInfoService(username_)
    }, {
        onSuccess() {
            setIsLogined(true);
        }
    });
    const { username } = data || {};

    // 退出登录
    function logout() {
        // 清除本地存储的token
        removeToken();
        nav(LOGIN_URL)
    }

    // 展示用户信息的组件
    const ShowUserInfo: FC = () => {
        return (
            <>
                <span style={{ color: "#e8e8e8" }}>
                    <UserOutlined />
                    {username}
                </span>
                <Button type="link" onClick={logout}>退出登录</Button>
            </>
        )
    }
    // 展示登录的组件
    const ShowLogin: FC = () => {
        return (
            <>
                <Link to={LOGIN_URL}>登录</Link>
            </>
        )
    }

    return (
        <div>
            {isLogined ? <ShowUserInfo /> : <ShowLogin />}
        </div>
    )
}


export default UserInfo;

