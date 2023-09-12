import { AppstoreAddOutlined, BarsOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import {FC} from "react";
import ComponentLib from "./ComponentLib";
import Layers from "./Layers";

const LeftPanel: FC = () => {
    
    const tabsItems = [
        // 组件库
        {
            key: "componentLib",
            label: (
                <span>
                    <AppstoreAddOutlined />
                    组件库
                </span>
            ),
            children : <ComponentLib/>
        },
        // 图层
        {
            key: "layers",
            label: (
                <span>
                    <BarsOutlined />
                    图层
                </span>
            ),
            children: <Layers/>
        }
    ]

    return <Tabs defaultActiveKey="componentLib" items={tabsItems}></Tabs>
}


export default LeftPanel;