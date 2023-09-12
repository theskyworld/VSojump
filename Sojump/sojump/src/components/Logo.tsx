// Logo组件
import React, { FC } from "react";
import styles from "./Logo.module.scss";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title } = Typography;


const Logo: FC = () => {
    return(
        <div className={styles.container}>
            <Link to="/">
                <Space>
                    {/* Title的level属性可以指定级别，默认值为1，等价于h1 */}
                    <Title>
                        <FormOutlined></FormOutlined>
                    </Title>
                    <Title>V问卷</Title>
                </Space>
            </Link>
        </div>
    )
}

export default Logo;