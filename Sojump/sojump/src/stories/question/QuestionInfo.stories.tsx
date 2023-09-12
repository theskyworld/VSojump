import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuestionInfo from '../../components/questionComponents/QuestionInfo'

export default {
    title: 'Question/QuestionInfo',
    component: QuestionInfo,
} as ComponentMeta<typeof QuestionInfo>

const Template: ComponentStory<typeof QuestionInfo> = args => <QuestionInfo {...args} />

export const Default = Template.bind({})
Default.args = {}

export const SetProps = Template.bind({})
SetProps.args = {
    title: 'hello',
    description: 'world',
}

export const DescBreakLine = Template.bind({})
DescBreakLine.args = {
    title: 'hello',
    description: 'world\nworld\nworld', // 换行
}
