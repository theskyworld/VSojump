import React from "react";
import QuestionInfo from "./index";
import { render, screen } from "@testing-library/react";


// 测试不向QuestionInfo组件中传递任何props，使用默认属性时的渲染情况
test("默认属性", () => {    
    render(<QuestionInfo />); // 渲染组件
    const h = screen.getByText("问卷标题"); // 根据组件或元素中的文本内容获取对应的组件或元素

    expect(h).toBeInTheDocument();
    
})

// 测试传入属性
test('传入属性', () => {
    render(<QuestionInfo title="hello" description="world" />)

    const h = screen.getByText('hello')
    expect(h).toBeInTheDocument()

    const p = screen.getByText('world')
    expect(p).toBeInTheDocument()
})

// 测试多行文本换行
test('多行文字', () => {
    render(<QuestionInfo description={'a\nb\nc'} />)

    const span = screen.getByText('a')
    expect(span).toBeInTheDocument()

    expect(span).toHaveTextContent('a')
    expect(span).not.toHaveTextContent('ab') // 被换行了
})