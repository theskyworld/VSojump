import React, { FC } from 'react'
import classNames from 'classnames'
import styles from './QuestionDetail.module.scss'
import useGetComponentInfo from '../../../../hooks/useGetComponentInfo'
import { getComponentConfigByType } from '../../../../components/questionComponents/componentsConfig'
 
interface QuestionDetailProps {
    selectedComponentId: string
    setSelectedComponentId: (id: string) => void
    setSelectedComponentType: (type: string) => void
}

const QuestionDetail: FC<QuestionDetailProps> = (props: QuestionDetailProps) => {
    const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
    const { components } = useGetComponentInfo()

    return (
        <div className={styles.container}>
            {components
                .filter(c => !c.isHidden) // 过滤隐藏的组件
                .map(c => {
                    const { fe_id, props, type } = c

                    const componentConf = getComponentConfigByType(type)
                    if (componentConf == null) return null

                    const { Component } = componentConf

                    // 拼接 class name
                    const wrapperDefaultClassName = styles['component-wrapper']
                    const selectedClassName = styles.selected
                    const wrapperClassName = classNames({
                        [wrapperDefaultClassName]: true,
                        [selectedClassName]: fe_id === selectedComponentId, // 是否选中
                    })

                    return (
                        <div
                            className={wrapperClassName}
                            key={fe_id}
                            onClick={() => {
                                setSelectedComponentId(fe_id)
                                setSelectedComponentType(type)
                            }}
                        >
                            <div className={styles.component}>
                                <Component {...props}></Component>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default QuestionDetail
