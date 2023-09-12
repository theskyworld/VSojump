import React from 'react'
import { render, screen } from '@testing-library/react'

import QuestionTextarea from './index'

test('默认属性', () => {
    render(<QuestionTextarea />)

    const p = screen.getByText('多行输入框')
    expect(p).toBeInTheDocument()

    const textarea = screen.getByPlaceholderText('请输入内容')
    expect(textarea).toBeInTheDocument()
})

test('传入属性', () => {
    render(<QuestionTextarea title="hello" placeholder="world" />)

    const p = screen.getByText('hello')
    expect(p).toBeInTheDocument()

    const textarea = screen.getByPlaceholderText('world')
    expect(textarea).toBeInTheDocument()
})
