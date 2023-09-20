import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { getComponentConfigByType } from '../../../../components/questionComponents/componentsConfig'
import { getComponentStatService } from "../../../../service/stat"

const { Title } = Typography

interface ChartStatProps {
    selectedComponentId: string
    selectedComponentType: string
}

const ChartStat: FC<ChartStatProps> = (props: ChartStatProps) => {
    const { selectedComponentId, selectedComponentType } = props
    const { id = '' } = useParams()

    const [stat, setStat] = useState([])
    const { run } = useRequest(
        async (questionId, componentId) => await getComponentStatService(questionId, componentId),
        {
            manual: true,
            onSuccess(res) {
                setStat(res.stat)
            },
        }
    )

    useEffect(() => {
        if (selectedComponentId) run(id, selectedComponentId)
    }, [id, selectedComponentId])

    // 生成统计图表
    function genStatElem() {
        if (!selectedComponentId) return <div>未选中组件</div>

        // 组件的统计图表组件动态来自于该组件的例如QuestionRadioStat组件，只有QuestionRadio和QuestionCheckbox组件存在统计图表组件
        const { StatComponent } = getComponentConfigByType(selectedComponentType) || {}
        if (!StatComponent ) return <div>该组件无统计图表</div>
        // console.log("🚀 ~ file: index.tsx:20 ~ stat:", stat)

        return <StatComponent stat={stat} />
    }

    return (
        <>
            <Title level={3}>图表统计</Title>
            <div>{genStatElem()}</div>
        </>
    )
}

export default ChartStat
