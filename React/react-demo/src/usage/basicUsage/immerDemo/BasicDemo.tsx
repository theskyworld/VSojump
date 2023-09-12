import { FC, useState } from "react";
import produce from "immer";



const BasicDemo: FC = () => {
    const initalBaseState = [
        {
            title: "Learn TypeScript",
            done: true
        },
        {
            title: "Try Immer",
            done: false
        }
    ]

    const [baseState, setBaseState] = useState(initalBaseState);


    // 不使用immer
    
    // 对原来的数据进行复制
    // 复制以后能够对复制后的数据进行修改，不报错，而不是对原来的数据进行修改
    const nextState = baseState.slice();

    // 修改数据
    function reviseBaseData() {
        // 修改数据中的第二个值
        // nextState[1] = {
        //     // 将第二个值中其它不需要修改的数据进行浅拷贝
        //     ...nextState[1],
        //     // 对要修改的数据进行修改
        //     done: true
        // }

        setBaseState(nextState);
    }

    // 添加数据
    function addBaseData() {
        nextState.push({
            title: "Learn Immer",
            done: false
        });

        setBaseState(nextState);
    }


    // 使用immer
    const nextState1 = produce(baseState, draft => {
        // 修改数据
        draft[1].done = true;

        // 添加新数据
        draft.push({
            title: "Learn Immer",
            done: false
        })
    })

    function changeBaseState() {
        setBaseState(nextState1);
    }
    return (
        <>
            <p>{JSON.stringify(baseState)}</p>
            <button onClick={reviseBaseData}>修改数据</button>
            <button onClick={addBaseData}>添加数据</button>
            <button onClick={changeBaseState}>immer</button>
        </>
    )
};
export default BasicDemo;