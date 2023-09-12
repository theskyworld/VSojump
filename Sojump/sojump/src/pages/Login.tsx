import { UserAddOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Typography, Space, Form, Input, Button, Checkbox, message } from "antd";
import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_URL, MANAGE_LIST_URL, PASSWORD_KEY, REGISTER_URL, USERNAME_KEY } from "../assets/ts/constants";
import { setToken } from "../assets/utils/userToken";
import { loginUserService } from "../service/user";
import styles from "./Register.module.scss";



const Login: FC = () => {
    const { Title } = Typography;
    const nav = useNavigate();
    const [form] = Form.useForm();


    const {loading : loginLoading, run } = useRequest(
        async (username, password) => loginUserService(username, password),
        {
            manual: true,
            debounceWait : 500,
            onSuccess(result) {
                // 存储token
                const { token = "" } = result;
                setToken(token);
                message.success("登录成功");
                nav(MANAGE_LIST_URL);
            }
        }
    )


    useEffect(() => {
        const { username, password } = getUserFromLocalStorage() || { username: "", password: "" };
        // 用于在初始化页面或者重新刷新时，如果remember值为true，自动在username和password中填充已保存的值
        form.setFieldsValue({ username, password });
    }, [])
    function onFinish(values: any) {
        // 获取表单中提交的数据
        // console.log(values)
        const { username, password, remember } = values;

        if (remember) {
            rememberUser(username, password);
        } else {
            deleteUserFromLocalStorage();
        }
        run(username, password);
    }


    function rememberUser(username: string, password: string) {
        localStorage.setItem(USERNAME_KEY, JSON.stringify({
            [USERNAME_KEY]: username,
            [PASSWORD_KEY]: password
        }));
    }

    function deleteUserFromLocalStorage() {
        localStorage.removeItem(USERNAME_KEY);
    }

    function getUserFromLocalStorage() {
        return JSON.parse(localStorage.getItem(USERNAME_KEY)!);
    }


    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div>
                    <Space style={{ margin: "10px", transform: "translateX(12px)" }}>
                        <Title level={2}>
                            <UserAddOutlined />
                        </Title>
                        <Title level={2}>用户登录</Title>
                    </Space>
                </div>
                <div>
                    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish} initialValues={{ remember: true }} form={form}>
                        <Form.Item label="用户名" name="username" rules={[
                            {
                                required: true,
                                message: "请输入用户名!"
                            },
                            {
                                type: 'string',
                                min: 5,
                                max: 20,
                                message: "字符长度在5-20之间"
                            },
                            {
                                pattern: /^\w+$/,
                                message: "只能包含字母、数字和下划线"
                            }
                        ]}>
                            <Input autoComplete="true" />
                        </Form.Item>
                        <Form.Item label="密&nbsp;&nbsp;&nbsp;&nbsp;码" name="password" rules={[
                            {
                                required: true,
                                message: "请输入密码!"
                            }
                        ]}>
                            <Input.Password autoComplete="true" />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked" style={{ width: "300px" }} wrapperCol={{ span: 16, offset: 6 }}>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
                            <Space>
                                <Button style={{ marginRight: "50px" }} type="primary" htmlType="submit" disabled={loginLoading} >登录</Button>
                                <Link to={REGISTER_URL} >注册新用户</Link>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div >
    )
}
export default Login;
