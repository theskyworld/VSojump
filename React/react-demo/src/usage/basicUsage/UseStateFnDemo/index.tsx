import { FC, useState } from "react";

// 用于生成初始的arr变量
function genArr() {
    console.log("genArr...");
    const arr : any[] = [];

    return arr;
}

const Demo: FC = () => {
    // useState中传入函数,该函数只会在组件初始渲染时执行一次
    // 不会跟随这以后每次组件更新时组件函数再执行而执行
    const [arr, setArr] = useState(genArr);

    // 更新arr
    // 该函数每执行一次,会导致状态arr的变化,导致组件的更新,组件函数的重新执行
    // 但是genArr函数只会在组件初始渲染时执行一次
    function addStrToArr() {
        setArr([...arr, "hello"]);
    }

    return (
        <>
            <p>length : {arr.length}</p>
            <div>
                <button onClick={addStrToArr}>add</button>
            </div>
        </>
    )
}

export default Demo;