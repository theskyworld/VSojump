# Immer

<https://immerjs.github.io/immer/>

## [基本使用](https://immerjs.github.io/immer/zh-CN/)

```tsx
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
```

## [使用插件化功能](https://immerjs.github.io/immer/zh-CN/installation)

为了使Immer尽可能的小，在版本6及之后，如果需要以下功能时，需要通过在`index.tsx`文件中调用对应的插件函数后进行使用

| 功能                                                         | 描述                                                         | 调用方法          |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------- |
| ES 5 支持                                                    | 如果您的应用程序需要能够在较旧的 JavaScript 环境（例如 Internet Explorer 或 React Native）上运行，请启用此功能。 | `enableES5()`     |
| [ES2015 Map and Set 支持](https://immerjs.github.io/immer/zh-CN/complex-objects) | 要使 Immer 能够对原生 Map 和 Set 集合进行操作，请启用此功能  | `enableMapSet()`  |
| [JSON 补丁 支持](https://immerjs.github.io/immer/zh-CN/patches) | Immer 可以跟踪您对 draft 对象所做的所有更改。这对于使用 JSON 补丁时传达更改很有用 | `enablePatches()` |

``` tsx
// index.tsx
import { enableMapSet } from "immer";
enableMapSet();

```

```tsx
import produce from 'immer';
import React, { FC, useState } from 'react';
const EnableMapSetDemo: FC = () => {
    const [mapState, setMapState] = useState(new Map<string, { name: string, age: number }>());

    // 对Map进行操作
    function changeMapState() {
        const newMapState = produce(mapState, draft => {
            draft.set("Bob1", { name: "Bob1 Daily", age: 12 })
        });

        setMapState(newMapState);
    }
    return (
        <>
            <p>{JSON.stringify(Object.fromEntries(mapState))}</p>
            <button onClick={changeMapState}>changeMapState</button>
        </>
    );
};
export default EnableMapSetDemo;
```
