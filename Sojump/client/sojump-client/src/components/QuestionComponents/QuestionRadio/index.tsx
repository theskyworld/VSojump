import React, { FC } from 'react'
import styles from './QuestionRadio.module.scss'

interface QuestionRadioProps{
    fe_id: string
    props: {
        title: string
        options: Array<{
            value: string
            text: string
        }>
        value: string
        isVertical: boolean
    }
}

const QuestionRadio: FC<QuestionRadioProps> = ({ fe_id, props }) => {
    const { title, options = [], value, isVertical } = props
    // console.log("🚀 ~ file: index.tsx:19 ~ options:", options)

    return <>
        <p>{title}</p>
        <ul className={styles.list}>
            {options.map(opt => {
                const { text: val, text } = opt

                // 判断竖向、横向
                let liClassName = ''
                if (isVertical) liClassName = styles.verticalItem
                else liClassName = styles.horizontalItem

                return <li key={val} className={liClassName}>
                    <label>
                        {/* 添加radio标记，用于在后端对该组件的答案值进行数据统计 */}
                        <input type="radio" name={fe_id + 'radio'} value={val} defaultChecked={val === value} />
                        {text}
                    </label>
                </li>
            })}
        </ul>
    </>
}

export default QuestionRadio
