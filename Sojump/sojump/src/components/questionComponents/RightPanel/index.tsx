import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import PageSettings from "./PageSettings";
import Prop from "./Prop";



enum TAB_KEYS {
    PROP_KEY = "prop",
    SETTING_KEY = "setting"
}


const RightPanel: FC = () => {
    const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);
    const { selectedId } = useGetComponentInfo();

    // 如果当前未选中任何画布中的组件，右侧栏中默认展示页面设置栏
    useEffect(() => {
        if (selectedId) setActiveKey(TAB_KEYS.PROP_KEY)
        else setActiveKey(TAB_KEYS.SETTING_KEY);
    }, [selectedId])

    const tabsItems = [
        // 属性
        {
            key: TAB_KEYS.PROP_KEY,
            label: (
                <span>
                    <FileTextOutlined />
                    属性
                </span>
            ),
            children: <Prop/>
        },
        // 设置
        {
            key: TAB_KEYS.SETTING_KEY,
            label: (
                <span>
                    <SettingOutlined />
                    页面设置
                </span>
            ),
            children: <PageSettings/>
        }
    ]
    // 动态设置activeKey的值
    return <Tabs activeKey={activeKey} items={tabsItems}></Tabs>
}


export default RightPanel;