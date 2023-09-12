import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuestionInput from '../../components/questionComponents/QuestionInput'

export default {
  title: 'Question/QuestionInput',
  component: QuestionInput,
} as ComponentMeta<typeof QuestionInput>

const Template: ComponentStory<typeof QuestionInput> = args => <QuestionInput {...args} />

export const Default = Template.bind({})
Default.args = {}

export const SetProps = Template.bind({})
SetProps.args = {
  title: 'Custom title',
  placeholder: 'Type here...',
}
