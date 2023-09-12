import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuestionTitle from '../../components/questionComponents/QuestionTitle'

export default {
  title: 'Question/QuestionTitle',
  component: QuestionTitle,
} as ComponentMeta<typeof QuestionTitle>

const Template: ComponentStory<typeof QuestionTitle> = args => <QuestionTitle {...args} />

export const Default = Template.bind({})
Default.args = {}

export const SetProps = Template.bind({})
SetProps.args = {
  text: 'hello',
  level: 2,
  isCenter: true,
}
