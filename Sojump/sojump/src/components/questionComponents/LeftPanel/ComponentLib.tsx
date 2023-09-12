// 组件库
import { FC } from "react";
import { ComponentsConfig, componentsGroupConfig } from "../componentsConfig";
import { Typography } from "antd";
import styles from "./ComponentLib.module.scss";
import { useDispatch } from "react-redux";
import { addComponent } from "../../../store/componentsReducer";
import getRandomId from "../../../assets/utils/getRandomId";

function generateComponent(c : ComponentsConfig) {
    const { title, Component, type, defaultProps } = c;
    const dispatch = useDispatch();

    // 在左边栏中点击当前组件后，将当前组件作为新组件添加到画布中
    function handleClick() {
        dispatch(
            addComponent({
                fe_id: getRandomId(5),
                title,
                type,
                isHidden: false,
                isLocked: false,
                props : defaultProps,
            })
        )
    }


    return (
        <div key={type} className={styles.wrapper} onClick={handleClick}>
            <div className={styles.component}>
                <Component />
            </div>
        </div>
    )
}

const ComponentLib: FC = () => {
    const { Title } = Typography;

    return (
        <>
            {
                componentsGroupConfig.map((group, index) => {
                    const { groupId, groupName, components } = group;
                    return (
                        <div key={groupId}>
                            <Title level={3} style={{ color : "#1890ff", fontSize : "16px", marginTop : index > 0 ? "20px" : "0"} }>
                                <span>{groupName }</span>
                            </Title>
                            <div>{components.map(c => generateComponent(c)) }</div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ComponentLib;