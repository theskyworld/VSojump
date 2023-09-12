import { Typography, Input } from "antd";
import { FC } from "react";
import { QuestionTextareaProps } from "./questionTextarea";


export const defaultQuestionTextareaProps: QuestionTextareaProps = {
    title: "多行输入框",
    placeholder: "请输入内容"
}

const QuestionTextarea: FC<QuestionTextareaProps> = (props: QuestionTextareaProps) => {
    const { title, placeholder } = { ...defaultQuestionTextareaProps, ...props };
    const { Paragraph } = Typography;
    const {TextArea} = Input

    return (
        <div>
            <Paragraph strong>{title}</Paragraph>
            <div>
                <TextArea placeholder={placeholder}></TextArea>
            </div>
        </div>
    )
}


export default QuestionTextarea;