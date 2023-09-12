import styles from "./EditCanvas.module.scss";
import { FC, MouseEvent, useEffect } from "react";
import QuestionTitle from "../QuestionTitle";
import QuestionInput from "../QuestionInput";
import { Spin } from "antd";
import { ComponentInfoProps, ComponentsConfig, getComponentConfigByType } from "../componentsConfig";
import { changeSelectedId, ComponentInfo, moveComponent } from "../../../store/componentsReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress";
import SortableContainer from "../../dragSortable/SortableContainer";
import SortableItem from "../../dragSortable/SortableItem";


interface EditCanvasProps {
    loading: boolean;
}


// 根据组件的配置动态生成组件
function generateComponentByConfig(componentInfo: ComponentInfo) {
    // 获取componentInfo中的type属性和props属性
    const { type, props } = componentInfo;


    // 根据type属性获取对应的组件配置，其中包含component属性（对应的最终组件）
    const componentConfig = getComponentConfigByType(type);
    if (!componentConfig) return null;
    // 最终的组件
    const { Component } = componentConfig;
    // 返回最终的组件及其属性
    return <Component {...props} />

}

const EditCanvas: FC<EditCanvasProps> = ({ loading }) => {
    const { components, selectedId } = useGetComponentInfo();
    const dispatch = useDispatch();
    

    // 点击组件时选中组件
    function handleClick(event : MouseEvent<HTMLDivElement>, id: string) {
        // 阻止冒泡
        event.stopPropagation();
        dispatch(changeSelectedId(id));
    }

    // 绑定快捷键
    useBindCanvasKeyPress();

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Spin size="large" tip="Loading..."></Spin>
            </div>
        )
    }


    function handleDragEnd(oldIndex: number, newIndex: number) {
        // 拖拽结束时，移动组件位置，实现排序功能
        // 相较于普通元素或者文本作为SortableItem的子元素，组件作为其子元素时需要自己实现拖拽结束后更新组件位置的功能
        dispatch(moveComponent({ oldIndex, newIndex }))
    }
    return (
        // 根据当前问卷所包含的不同组件的配置来动态地生成组件及其对应的组件中的数据
        <div className={styles.canvas}>
            <SortableContainer items={components.map(c => ({ ...c, id: c.fe_id }))} onDragEnd={handleDragEnd}>
                {
                    components.map((componentInfo: ComponentInfo) => {
                        const { fe_id, isLocked } = componentInfo;
                        // 使用clsx拼接wrapper的className
                        const wrapperDefaultClassName = styles['component-wrapper'];
                        const wrapperSelectedClassName = styles.selected;
                        const wrapperLockedClassName = styles.locked;
                        const wrapperClassName = clsx({
                            [wrapperDefaultClassName]: true,
                            [wrapperSelectedClassName]: selectedId === fe_id,
                            [wrapperLockedClassName]: isLocked,
                        })
                        return (
                            <SortableItem key={fe_id} id={fe_id}>
                                <div className={wrapperClassName} onClick={(e) => handleClick(e, fe_id)}>
                                    <div className={styles.component}>
                                        {generateComponentByConfig(componentInfo)}
                                    </div>
                                </div>
                            </SortableItem>
                        )
                    })
                }
            </SortableContainer>
        </div>
    )
}

export default EditCanvas;