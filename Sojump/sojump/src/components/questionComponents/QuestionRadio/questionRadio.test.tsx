import React from 'react'
import { render, screen } from '@testing-library/react'

import QuestionRadio from './index'

test('默认属性', () => {
    render(<QuestionRadio />)

    const p = screen.getByText('单选标题')
    expect(p).toBeInTheDocument()

    // 循环获取每个选项
    for (let i = 1; i <= 3; i++) {
        const radio = screen.getByDisplayValue(`item${i}`)
        expect(radio).toBeInTheDocument()
        const label = screen.getByText(`选项${i}`)
        expect(label).toBeInTheDocument()
    }
})

test('传入属性', () => {
    const opts = [
        {id : "o1", value: 'v1', text: 't1' },
        { id: "o2", value: 'v2', text: 't2' },
        { id: "o3", value: 'v3', text: 't3' },
    ]
    const value = 'v1'
    render(<QuestionRadio title="hello" options={opts} value={value} />)

    const p = screen.getByText('hello')
    expect(p).toBeInTheDocument()

    for (let i = 1; i <= 3; i++) {
        const curVal = `v${i}`
        const radio = screen.getByDisplayValue(curVal)
        expect(radio).toBeInTheDocument()
        const label = screen.getByText(`t${i}`)
        expect(label).toBeInTheDocument()

        // 当前选中的选项
        if (curVal === value) {
            expect(radio.getAttribute('checked')).not.toBeNull()
        }
    }
})
