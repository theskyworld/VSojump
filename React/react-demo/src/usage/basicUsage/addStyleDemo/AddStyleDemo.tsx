import React, { useState } from "react";
// import "./index.css";
import styles from "./addStyleDemo.module.css";
import styled, { css } from "styled-components";


// 使用styled-components库
// 添加一个已存在样式的Button组件
interface ButtonProps {
    $primary?: boolean;
}
const Button = styled.button<ButtonProps>`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #BF4F74;
  color: '#BF4F74';
  margin: 0 1em;
  padding: 0.25em 1em;


// 如果Button组件中存在$primary属性，就添加以下样式
  ${props =>
    props.$primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`

// 添加一个已存在样式的容器组件
const Container = styled.div`
    text-align: center;
`


const AddStyleDemo = () => {
    const [text, setText] = useState("hello");
    const [danger, setDanger] = useState(true);

    // 或者
    const style1 = {
        color: "green",
        border: "solid 1px #ccc",
        fontSize: "20px",
        borderRadius: "5px",
        width: "fit-content",
        padding : "0 5px",
    }

    // 使用动态的className
    let className1 = "add-style-demo";
    if (danger) className1 += " danger";
    return (
        <>
            <div>
            <p style={{ color: "green", border: "solid 1px #ccc", fontSize: "20px", width: "fit-content",padding : "0 5px", }}>{text}</p>
            <p style={style1}>{text}</p>
            <p className="add-style-demo">{text}</p>
            <p className={danger ? "add-style-demo danger" : "add-style-demo"}>{text}</p>
            {/* 或者 */}
            <p className={className1}>{text}</p>
            
            <p className={styles["add-style-demo"]}>{text}</p>
        </div>
        <div>
                <Container>
                    <Button>Normal Button</Button>
            <Button $primary>Primary Button</Button>
            </Container>
                
        </div>
        </>
    )
}

export default AddStyleDemo;