import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuestionCheckbox from '../../components/questionComponents/QuestionCheckbox'

export default {
  title: 'Question/QuestionCheckbox',
  component: QuestionCheckbox,
} as ComponentMeta<typeof QuestionCheckbox>

const Template: ComponentStory<typeof QuestionCheckbox> = args => <QuestionCheckbox {...args} />

export const Default = Template.bind({})
Default.args = {}

export const SetProps = Template.bind({})
SetProps.args = {
  title: 'hello',
  list: [
    {id : "l1", value: 'v1', text: 't1', isChecked: false },
    {id : "l2", value: 'v2', text: 't2', isChecked: true },
    {id : "l3", value: 'v3', text: 't3', isChecked: true },
  ],
  isVertical: true,
}
