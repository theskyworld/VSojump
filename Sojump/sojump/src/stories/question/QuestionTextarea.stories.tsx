import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuestionTextarea from '../../components/questionComponents/QuestionTextarea'

export default {
  title: 'Question/QuestionTextarea',
  component: QuestionTextarea,
} as ComponentMeta<typeof QuestionTextarea>

const Template: ComponentStory<typeof QuestionTextarea> = args => <QuestionTextarea {...args} />

export const Default = Template.bind({})
Default.args = {}

export const SetProps = Template.bind({})
SetProps.args = {
  title: 'Custom title',
  placeholder: 'Type here...',
}
