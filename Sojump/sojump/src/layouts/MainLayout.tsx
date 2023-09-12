import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import styles from "./MainLayout.module.scss";
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";

const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.left}><Logo></Logo></div>
                <div className={styles.right}><UserInfo/></div>
            </Header>
            <Content className={styles.main}>
                {/* 类似于vue中的slot,RouterView */}
                <Outlet></Outlet>
            </Content>
            <Footer className={styles.footer}>V问卷 &copy;2023 - now. Created by tsw</Footer>
        </Layout>

    )
}

export default MainLayout;
