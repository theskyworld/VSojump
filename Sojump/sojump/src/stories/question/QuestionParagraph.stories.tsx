import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuestionParagraph from '../../components/questionComponents/QuestionParagraph'

export default {
  title: 'Question/QuestionParagraph',
  component: QuestionParagraph,
} as ComponentMeta<typeof QuestionParagraph>

const Template: ComponentStory<typeof QuestionParagraph> = args => <QuestionParagraph {...args} />

export const Default = Template.bind({})
Default.args = {}

export const SetProps = Template.bind({})
Default.args = {
  text: 'hello',
  isCenter: true,
}

export const BreakLine = Template.bind({})
BreakLine.args = {
  text: 'hello\nhello\nhello',
}
