import React, { FC } from 'react'

interface QuestionInfoProps{
    title: string
    description?: string
}

const QuestionInfo: FC<QuestionInfoProps> = ({ title, description }) => {
    return <div style={{ textAlign: 'center' }}>
        <h1>{title}</h1>
        <p>{description}</p>
    </div>
}

export default QuestionInfo
