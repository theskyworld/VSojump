import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuestionRadio from '../../components/questionComponents/QuestionRadio'

export default {
  title: 'Question/QuestionRadio',
  component: QuestionRadio,
} as ComponentMeta<typeof QuestionRadio>

const Template: ComponentStory<typeof QuestionRadio> = args => <QuestionRadio {...args} />

export const Default = Template.bind({})
Default.args = {}

export const SetProps = Template.bind({})
SetProps.args = {
  title: 'hello',
  options: [
    {id : "o1", value: 'v1', text: 't1' },
    { id: "o2", value: 'v2', text: 't2' },
    { id: "o3", value: 'v3', text: 't3' },
  ],
  value: 'v1',
  isVertical: true,
}
