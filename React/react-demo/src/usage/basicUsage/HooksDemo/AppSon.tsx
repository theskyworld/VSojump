import React, { useEffect } from "react";

interface AppSonProps {
    id: number;
    title: number;
    deleteNum: (id: number) => void;
}

const AppSon = (props : AppSonProps) => {
    const {id, title, deleteNum } = props;
    useEffect(() => {// 该回调函数在组件初次挂载和重渲染时触发
        
        console.log("组件挂载...")
        return () => { // 该回调函数同时也在组件卸载时触发
            console.log("组件卸载...")
        }
    }, []);


    function deleteN(id : number) {
        deleteNum && deleteNum(id);
    }
    return (
        <>
            <li>{title}</li>
            <button onClick={() => deleteN(id)}>删除</button>
        </>
    )
}

export default AppSon;