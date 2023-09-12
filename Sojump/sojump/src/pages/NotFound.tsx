import React, { FC } from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { MANAGE_LIST_URL } from "../assets/ts/constants";


const NotFound: FC = () => {
    const nav = useNavigate();
    return (
        <Result status="404" title="404" subTitle="抱歉，您访问的页面不存在" extra={<Button type="primary" onClick={() => nav(MANAGE_LIST_URL)}>返回列表页</Button>}></Result >
    )
}

export default NotFound;