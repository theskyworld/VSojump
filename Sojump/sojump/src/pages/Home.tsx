import React, { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Typography } from "antd";
import { MANAGE_LIST_URL } from "../assets/ts/constants";
import styles from "./Home.module.scss";


const { Title, Paragraph } = Typography;


const Home: FC = () => {
    const nav = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <Title>问卷调查 | 在线投票</Title>
                <Paragraph>已累计创建问卷100份，发布问卷50份，收到答卷100份</Paragraph>
                <div>
                    <Button type="primary" onClick={() => nav(MANAGE_LIST_URL)}>开始使用</Button>
                </div>

            </div>
        </div>
    )
}

export default Home;