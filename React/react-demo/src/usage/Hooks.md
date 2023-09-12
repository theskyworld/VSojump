# Hooks

## `useState`

通过`useState`来定义一个响应式数据和对数据进行更新

```tsx
import react, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  function addCount() {
    setCount(count + 1);
  }

  return (
    <div>
      <button onClick={addCount}>{count}</button>
    </div>
  );
};
```

### 特点

- 异步更新
  - 在JSX中更新前，无法获取到更新后的响应式数据值

    ```tsx
    const App = () => {
        const [count, setCount] = useState(0);

        function addCount() {
            setCount(count + 1);
            console.log("current count : ", count); // 0 1 2 3 4 5... 获取到的值更新之前的值
        }

        return (
            <div className="App">
            <button onClick={addCount}>{count}</button>
            </div>
        );
    };

    ```

  - 在同一个修改响应式数据的函数内，多次的同步修改操作将被合并

    ```tsx
    function addCount() {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
        // 以上的多次对count修改的操作会被合并，页面上展示的count的值为1
    }
    ```

    除非使用异步修改的方式

    ```tsx
    function addCount() {
    setCount(count => count + 1);
    setCount(count => count + 1);
    setCount(count => count + 1);
    // 页面上展示的count的值为3
    }
    ```

- 不可变数据

  ```tsx
  const App = () => {
    const [userInfo, setUserInfo] = useState({name : 'Alice', age : 12})
    const [nums, setNums] = useState([1,2,3]);
    const [num, setNum] = useState(0);

    // 对于引用类型的数据
    function addUserInfoAge() {
        // 对响应式数据进行修改时，并不是直接对原来的值进行修改
        // 而是传入一个新的值来覆盖原来的值
        setUserInfo({
        ...userInfo,
        // 使用+1后的age
        age: userInfo.age + 1
        })
    };

    function addNums() {
        setNums(nums.concat(4, 5));
        // 或
        // setNums([...nums, 4, 5]);
    }

    // 对于基本类型的数据
    function addNum() {
      setNum(num + 1);
    }

    return (
        <div className="App">
        {/* <button onClick={addCount}>{count}</button> */}
        <p>{JSON.stringify(userInfo)}</p>
        <button onClick={addUserInfoAge}>click</button>
        <p>{JSON.stringify(nums)}</p>
        <button onClick={addNums}>click</button>
        <p>{num}</p>
        <button onClick={addNum}>click</button>
        </div>
    );
  };
    ```

使用[immer](https://immerjs.github.io/immer/)

- 由于在react中的state都是不可变的数据，直接对原state的值进行修改将无效
- 一般都是通过使用新值来覆盖旧值的方式来实现对state的修改
  - `setValue(newValue)`
  - `setObj({...oldObj, newKey | key : newVal})`
  - `setArr(oldArr.concat(newVal) | [...oldArr, newVal])`
- 但是，通过immer中的`draft`可以使用类似于直接对原state进行修改的方式来实现对state的修改

```tsx
// 列表页组件
import { FC } from "react";
import React, {useState} from "react";
import QuestionCard from "./QuestionCard"
import {produce} from "immer";

const List: FC = () => {

  const [questionList, setQuestionList] = useState([
    {
      id: "q1",
      title: "问卷1",
      isPublished: false,
    },
    {
      id: "q2",
      title: "问卷2",
      isPublished: true,
    },
    {
      id: "q3",
      title: "问卷3",
      isPublished: false,
    },
  ])

  function editQuestion(id: string) {
    console.log(id);
  }

  function addQuestion() {
    const r = Math.random().toString().slice(-3);
    // setQuestionList([
    //   ...questionList, {
    //     id: "q4" + r ,
    //     title: "问卷" + r,
    //     isPublished : false,
    //   }
    // ])

    // 使用immer
    setQuestionList(
      produce(draft => {
        draft.push({
          id: "q4" + r ,
          title: "问卷" + r,
          isPublished : false,
        })
      })
    )
  }

  function deleteQuestion(id : string) {
    // setQuestionList(questionList.filter(question => question.id !== id));
  
    // 使用immer
    setQuestionList(produce(draft => {
      const index = draft.findIndex(question => question.id === id);
      draft.splice(index, 1);
    }))
  }

  function publishQuestion(id: string) {
    // setQuestionList(questionList.map((question) => {
    //   if (question.id !== id) return question;
    //   return {
    //     ...question,
    //     isPublished : true,
    //   }
    // }) as any)

    // 使用immer
    setQuestionList(produce(draft => {
      const targetQuestion = draft.find(question => question.id === id);
      targetQuestion && (targetQuestion.isPublished = true);
    }))
  }
  return (
    <div className="App">
      <h1>问卷列表</h1>
      <div>
        {questionList.map(question => {
          const { id, title, isPublished } = question;
          return <QuestionCard key={id} id={id} title={title} isPublished={isPublished} deleteQuestion={deleteQuestion} publishQuestion={publishQuestion} editQuestion={editQuestion}></QuestionCard>
        })}
      </div>
      <div>
        <button onClick={addQuestion}>添加问卷</button>
      </div>
    </div>
  );
};

export default List;

```

## `useReducer`

`useReducer`可以认为是`useState`的替代方案

当组件中数据结构简单时使用`useState`; 数据结构复杂时使用`useReducer`

`useReducer`不能用于统一的状态管理，因为当一个状态的值在一个组件中被更新时，在其它组件中无法获取到更新后的state

基本使用

```tsx
import { FC, useReducer } from "react";

interface CountState {
    count: number
}

interface CountAction {
    type: string;
}

//  state初始值
const initialState: CountState = {
    count: 100,
}

// 判断action的类型，对state(不可变数据)进行操作，返回新的state
function reducer(state: CountState, action: CountAction) {
    switch (action.type) {
        case "increase":
            return {
                count: state.count + 1,
            };
        case "decrease":
            return {
                count: state.count - 1,
            }
        default:
            throw new Error("wrong action type");
    }
}

const CountReducer: FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            <p>count : {state.count}</p>
            <button onClick={() => dispatch({ type: "increase" })}>+</button>
            <button onClick={() => dispatch({ type: "decrease" })}>-</button>
        </>
    )
}

export default CountReducer;
```

## `useEffect`

- 在组件初次渲染或者重新渲染时，执行指定的回调函数，触发对应的副作用
- 在组件初次渲染和组件更新和依赖更新时触发回调，执行指定的回调函数，触发对应的副作用

```tsx
  const [count, setCount] = useState(0);

 // 第一个参数为执行的回调函数，第二个参数为一个存放指定依赖的数组
  // 如果数组为空，表示回调函数在组件初次渲染和组件更新时进行回调
  // 如果数组不为空，表示回调函数在组件初次渲染和组件更新和依赖更新时触发回调
  useEffect(() => {
    console.log("组件更新...")
  }, [])
  
  useEffect(() => {
    console.log("count值更新...")
  },[count])
```

- 以及同时在组件销毁时触发回调函数

```tsx
useEffect(() => {// 该回调函数在组件初次挂载和重渲染时触发
        
        console.log("组件挂载...")
        return () => { // 该回调函数同时也在组件卸载时触发
            console.log("组件卸载...")
        }
    }, []);
```

**`useEffect`在组件初次渲染时会执行两次，因为初次渲染时在开发环境下会自动进行组件的创建、销毁、再创建的完整流程，以便暴露出其中的问题**

## `useRef`

一般使用该函数来作为手动操作DOM的一个入口

```tsx
const inputElemRef = useRef<HTMLInputElement>(null);
function selectInput() {
  console.log(inputElemRef.current); // input元素
  const inputElem = inputElemRef.current;
  inputElem && inputElem.select();
}

<input type="text" ref={inputElemRef} />
<button onClick={selectInput}>select</button>
```

## `useMemo`

react中的每一个组件都是一个函数，当组件内的state发生更新时，组件函数都会被重新执行一遍

如果组件较大，将可能造成大量性能消耗的问题

使用`useMemo`函数可以缓存组件内的数据，不用在每次重新执行组件函数时重新生成数据

其中回调函数的执行在依赖值发生变化时才会执行，组件函数的重新执行不会导致该回调函数的执行

```tsx
  // useMemo
  // 使用useMemo来计算num1和num2的和
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(5);

  const num1PlusNum2 = useMemo(() => num1 + num2, [num1, num2]);

  // 一个addNum1的函数
  function addNum1() {
    setNum1(num1 + 1);
  }
  // 同理处理num2
  function addNum2() {
    setNum2(num2 + 1);
  }

  <div>
        <p>{num1PlusNum2}</p>
        <p>{num1}</p>
        <button onClick={addNum1}>addNum1</button>
          <p>{num2}</p>
        <button onClick={addNum2}>addNum2</button>
      </div>
```

## `useCallback`

作用类似于`useMemo`，不过是用来缓存函数

```tsx
// useCallback
  const [text, setText] = useState("");

  const fn1 = () => {
    console.log("fn1-text : ", text);
  }
  const fn2 = useCallback(() => {
    console.log("fn2-text : ", text);
  }, [text]);

<div>
        <p>{text}</p>
        {/* 实现text和文本框中value值得双向绑定 */}
        <input type="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="输入内容..." />
        <button onClick={fn1}>fn1</button> &nbsp; <button onClick={fn2}>fn2</button>
      </div>      
```

## 自定义hook

### `useTitle`

创建一个自定义hook

```ts
// hooks\useTitle.ts
import React, { useEffect } from "react";

const useTitle = (title : string) => {
    useEffect(() => {
        document.title = title;
    }, []);
}
export default useTitle;
```

进行使用

```tsx
import useTitle from "./hooks/useTitle";

useTitle("Alice site")
```

### `useMousePosition`

```ts
import React, { useEffect, useState } from "react";

const useMousePosition = () => {
    // 等价于在目标组件中创建了以下代码
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const mouseMoveHandler = (event: MouseEvent) => {
        setX(event.clientX);
        setY(event.clientY);
    }

    useEffect(() => {
        // 组件初次渲染是监听mousemove事件
        window.addEventListener("mousemove", mouseMoveHandler);

        return () => {
            // 解除监听
            window.removeEventListener("mousemove", mouseMoveHandler);
        }
    }, []);

    // 返回的x,y在目标组件中具备响应式
    return {x, y}
}

export default useMousePosition;
```

```tsx
import useMousePosition from "./hooks/useMousePosition";

  const { x, y } = useMousePosition();
<div>
        position : {x}, {y}
      </div>
```

### `useAsyncGetInfo`

```ts
import React, { useState, useEffect } from "react";

async function getInfo(): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hello");
        }, 1000)        
    })
}


const useAsyncGetInfo = () => {
    const [info, setInfo] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getInfo().then((res) => {
            setInfo(res);
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setIsLoading(false);
        })
    }, []);
    return {info, isLoading, error};
}

export default useAsyncGetInfo;
```

```tsx
  const {info, isLoading, error} = useAsyncGetInfo();
  <p>{isLoading ? "加载中..." : info }</p>

```

## 第三方Hooks

- [ahooks](https://ahooks.js.org/zh-CN)
- [react-use](streamich.github.io/react-use)

## hooks闭包陷阱

```tsx
// hooks闭包陷阱
  const [n, setN] = useState(0);
  const nRef = useRef(0);
  useEffect(() => {
    nRef.current = n;
  }, [n]);
  function addN() {
    setN(n + 1);
  }
  function logN() {
    // 异步读取n的值
    setTimeout(() => {
      // 如果在调用logN函数异步读取n的值之后再次调用addN对n的值进行修改，只能读取到修改前的n的值
      console.log(n);
      // 但是使用useRef可以读取到修改后的n的值
      console.log(nRef.current);
    }, 3000);
  }

  <div>
        <p>{n}</p>
        <button onClick={addN}>addN</button>
        <button onClick={logN}>logN</button>
      </div>
```
