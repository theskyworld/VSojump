// 头部中的工具栏
import { BlockOutlined, CopyOutlined, DeleteOutlined, DownCircleOutlined, DownOutlined, EyeInvisibleOutlined, LockOutlined, RedoOutlined, UndoOutlined, UpCircleOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";
import { copyComponent, moveComponent, pasteCopiedComponent, removeSelectedComponent, toggleisHidden, toggleIsLocked } from "../../../../store/componentsReducer";
import { ActionCreators as UndoActionCreators } from 'redux-undo'


const EditToolbar: FC = () => {
    const dispatch = useDispatch();
    const { selectedId,selectedComponent, copiedComponent,components } = useGetComponentInfo();
    const { isLocked } = selectedComponent || {};
    const length = components.length;
    const selectedIndex = components.findIndex(c => c.fe_id === selectedId)
    const isFirst = selectedIndex <= 0 // 第一个
    const isLast = selectedIndex + 1 >= length // 最后一个


    function handleDelete() {
        dispatch(removeSelectedComponent());
    }


    // 通过工具栏隐藏组件
    function handleHidden() {
        dispatch(toggleisHidden())
    }

    // 锁定组件
    function handleLock() {
        dispatch(toggleIsLocked())
    }

    // 复制组件
    function copy() {
        dispatch(copyComponent())
    }

    // 粘贴组件
    function paste() {
        // 存在已复制的组件时才进行粘贴
        if (copiedComponent) {
            dispatch(pasteCopiedComponent())
        }
    }

    // 上移
    function moveUp() {
        if (isFirst) return
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
    }

    // 下移
    function moveDown() {
        if (isLast) return
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
    }

    // 撤销
    function undo() {
        dispatch(UndoActionCreators.undo())
    }

    // 重做
    function redo() {
        dispatch(UndoActionCreators.redo())
    }
    return (
        <Space>
            <Tooltip title='删除'>
                <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
            </Tooltip>
            <Tooltip title='隐藏'>
                <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
            </Tooltip>
            <Tooltip title={isLocked ? '解锁' : '锁定'}>
                <Button shape="circle" icon={<LockOutlined />} onClick={handleLock} type={isLocked ? 'primary' : 'default'}></Button>
            </Tooltip>
            <Tooltip title='复制'>
                <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
            </Tooltip>
            <Tooltip title='粘贴'>
                <Button shape="circle" icon={<BlockOutlined />} onClick={paste} disabled={!copiedComponent}></Button>
            </Tooltip>
            <Tooltip title="上移">
                <Button shape="circle" icon={<UpCircleOutlined />} onClick={moveUp} disabled={isFirst || !selectedId}></Button>
            </Tooltip>
            <Tooltip title="下移">
                <Button
                    shape="circle"
                    icon={<DownCircleOutlined />}
                    onClick={moveDown}
                    disabled={isLast || !selectedId}
                ></Button>
            </Tooltip>
            <Tooltip title="撤销">
                <Button shape="circle" icon={<UndoOutlined />} onClick={undo}></Button>
            </Tooltip>
            <Tooltip title="重做">
                <Button shape="circle" icon={<RedoOutlined />} onClick={redo}></Button>
            </Tooltip>
        </Space>
    );
}

export default EditToolbar

