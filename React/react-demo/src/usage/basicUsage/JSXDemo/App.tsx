import React, { useState } from "react";
import "./App.css";
import type { MouseEvent } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [isTrue, setIsTrue] = useState(false);
  const [flag, setFlag] = useState(true);

  const class1 = "class1";

  const users = [
    {
      id: 1,
      name: "Alice1",
    },
    {
      id: 2,
      name: "Alice2",
    },
    {
      id: 3,
      name: "Alice3",
    },
  ];

  function addCount(event: MouseEvent<HTMLButtonElement>) {
    setCount(count + 1);
    console.log(event.target);
  }

  function addCount1(event: MouseEvent<HTMLButtonElement>, num: number) {
    setCount(count + num);
    console.log(event.target);
  }

  function addCount2(num: number) {
    setCount(count + num);
  }

  function ShowHelloOrBye() {
    // 在函数内使用例如if...else...
    if (flag) {
      return <p>hello</p>;
    } else {
      return <p>bye</p>;
    }
  }

  return (
    <div className="App">
      <h3 style={{ color: "red", fontSize: "40px" }}>hello Alice! welcome!</h3>
      <button onClick={addCount}>count is : {count}</button>
      {/* 注释内容 */}
      <p id={"id1"} className={class1}>
        {isTrue ? "hello" : "bye"}
      </p>
      <button onClick={event => addCount1(event, 3)}>count is : {count}</button>
      <button onClick={() => addCount2(3)}>count is : {count}</button>
      {/* 如果flag的值为true，则渲染以下p元素，否则不渲染 */}
      <div>{flag && <p>hello</p>}</div>
      {/* 使用三元表达式 */}
      <div>{flag ? <p>hello</p> : <p>bye</p>}</div>
      {/* 使用函数 */}
      <div>
        <ShowHelloOrBye></ShowHelloOrBye>
      </div>
      <div>
        {users.map(user => {
          const { id, name } = user;
          return <p key={id}>{name}</p>;
          {
            /* 不建议使用index作为key的值 */
          }
        })}
      </div>
    </div>
  );
}

export default App;
