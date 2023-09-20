import React, { FC, useEffect, useState } from 'react'
import styles from './QuestionCheckbox.module.scss'

interface QuestionCheckboxProps {
    fe_id: string
    props: {
        title: string
        isVertical?: boolean
        list: Array<{
            value: string
            text: string
            checked: boolean
        }>
    }
}

const QuestionCheckbox: FC<QuestionCheckboxProps> = ({ fe_id, props }) => {
    const { title, isVertical, list = [] } = props

    const [selectedValues, setSelectedValues] = useState<string[]>([])

    // 初始化时，判断默认选中
    useEffect(() => {
        list.forEach(item => {
            const { text, checked } = item
            if (checked) {
                setSelectedValues(selectedValues => selectedValues.concat(text))
            }
        })
    }, [list])

    // 切换选中
    function toggleChecked(text: string) {
        if (selectedValues.includes(text)) {
            // 已经被选中了，则取消选择
            setSelectedValues(selectedValues => selectedValues.filter(v => v !== text))
        } else {
            // 未被选中，则增加选择
            setSelectedValues(selectedValues.concat(text))
        }
    }

    return <>
        <p>{title}</p>
        
        {/* 添加statable标记，用于在后端对该组件的答案值进行数据统计 */}
        <input type="hidden"  name={fe_id + 'checkbox'} value={selectedValues.toString()} />

        <ul className={styles.list}>
            {list.map(item => {

                const { value, text, checked } = item

                let className
                if (isVertical) className = styles.verticalItem
                else className = styles.horizontalItem

                return <li key={value} className={className}>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedValues.includes(text)}
                            onChange={() => toggleChecked(text)}
                        />
                        {text}
                    </label>
                </li>
            })}
        </ul>
    </>
}

export default QuestionCheckbox
