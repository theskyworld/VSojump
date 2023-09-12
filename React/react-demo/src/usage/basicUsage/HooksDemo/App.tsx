import react, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import "../../../styles/App.css";
import AppSon from "./AppSon";
import useAsyncGetInfo from "./hooks/useAsyncGetInfo";
import useMousePosition from "./hooks/useMousePosition";
import useTitle from "./hooks/useTitle";

const App = () => {
  // console.log("App function reExcu")
  const [count, setCount] = useState(0);
  const [userInfo, setUserInfo] = useState({name : 'Alice', age : 12})
  const [nums, setNums] = useState([1, 2, 3]);

  // 第一个参数为执行的回调函数，第二个参数为一个存放指定依赖的数组
  // 如果数组为空，表示回调函数在组件初次渲染和组件更新时进行回调
  // 如果数组不为空，表示回调函数在组件初次渲染和组件更新和依赖更新时触发回调
  useEffect(() => {
    console.log("组件更新...")
  }, [])
  
  useEffect(() => {
    console.log("count值更新...")
  },[count])
  function addCount() {
    setCount(count + 1);
    console.log("current count : ", count); // 0 1 2 3 4 5... 获取到的值更新之前的值
  }

  // function addCount() {
  //   setCount(count + 1);
  //   setCount(count + 1);
  //   setCount(count + 1);
  //   setCount(count + 1);
  //   // 以上的多次对count修改的操作会被合并，页面上展示的count的值为1
  // }
  // 除非使用异步修改的方式
  // function addCount() {
  //   setCount(count => count + 1);
  //   setCount(count => count + 1);
  //   setCount(count => count + 1);
  //   // 页面上展示的count的值为3
  // }

  function addUserInfoAge() {
    // 对响应式数据进行修改时，并不是直接对原来的值进行修改
    // 而是传入一个新的值来覆盖原来的值
    setUserInfo({
      ...userInfo,
      // 使用+1后的age
      age: userInfo.age + 1
    })
  }

  function addNum() {
    setNums(nums.concat(4, 5));
    // 或
    // setNums([...nums, 4, 5]);
  }

  function deleteNum(id: number) {
    setNums(nums.filter((num, index) => index !== id));
  }

  const inputElemRef = useRef<HTMLInputElement>(null);
  function selectInput() {
    console.log(inputElemRef.current); // input元素
    const inputElem = inputElemRef.current;
    inputElem && inputElem.select();
  }


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


  // useCallback
  const [text, setText] = useState("");

  const fn1 = () => {
    console.log("fn1-text : ", text);
  }
  const fn2 = useCallback(() => {
    console.log("fn2-text : ", text);
  }, [text]);


  // 自定义Hook
  useTitle("Alice site");
  const { x, y } = useMousePosition();
  const { info, isLoading, error } = useAsyncGetInfo();
  

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
  return (
    <div className="App">
      <button onClick={addCount}>{count}</button>
      <p>{JSON.stringify(userInfo)}</p>
      <button onClick={addUserInfoAge}>click</button>
      <p>{JSON.stringify(nums)}</p>
      <button onClick={addNum}>click</button>
      <div>
        <ul>
          {
            nums.map((num, index) => {
              return <AppSon id={index} key={num} title={num} deleteNum={deleteNum}></AppSon>
            })
          }
        </ul>
      </div>
      <input type="text" ref={inputElemRef} />
      <button onClick={selectInput}>select</button>
      <div>
        <p>{num1PlusNum2}</p>
        <p>{num1}</p>
        <button onClick={addNum1}>addNum1</button>
          <p>{num2}</p>
        <button onClick={addNum2}>addNum2</button>
      </div>
      <div>
        <p>{text}</p>
        {/* 实现text和文本框中value值得双向绑定 */}
        <input type="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="输入内容..." />
        <button onClick={fn1}>fn1</button> &nbsp; <button onClick={fn2}>fn2</button>
      </div>
      <div>
        position : {x}, {y}
        <p>{isLoading ? "加载中..." : info }</p>
      </div>
      <div>
        <p>{n}</p>
        <button onClick={addN}>addN</button>
        <button onClick={logN}>logN</button>
      </div>
    </div>
  );
};

export default App;