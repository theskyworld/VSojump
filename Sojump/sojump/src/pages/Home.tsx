import React, { FC, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Typography } from "antd";
import { MANAGE_LIST_URL, USERNAME_KEY } from "../assets/ts/constants";
import styles from "./Home.module.scss";
import Background from "../components/background/Background";


const { Title, Paragraph } = Typography;


const Home: FC = () => {
    const nav = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem(USERNAME_KEY)) {
            localStorage.setItem(USERNAME_KEY, JSON.stringify({ username: "", password: "" }));
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.bg}>
                <Background />
            </div>
            <div className={styles.info}>
                <Title>创意工厂|快速创建问卷</Title>
                <Paragraph>已累计创建问卷100份，发布问卷50份，收到答卷100份</Paragraph>
                <div>
                    <Button type="primary" onClick={() => nav(MANAGE_LIST_URL)}>开始使用</Button>
                </div>
            </div>
        </div>
    )
}

export default Home;