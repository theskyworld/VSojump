import { Typography, Input } from "antd";
import { FC } from "react";
import { QuestionInputProps } from "./questionInput";


export const defaultQuestionInputProps: QuestionInputProps = {
    title: "输入框标题",
    placeholder: "请输入内容"
}

const QuestionInput: FC<QuestionInputProps> = (props: QuestionInputProps) => {
    const { title, placeholder } = { ...defaultQuestionInputProps, ...props };
    const { Paragraph } = Typography;
    return (
        <div>
            <Paragraph strong>{title}</Paragraph>
            <div>
                <Input placeholder={placeholder}></Input>
            </div>
        </div>
    )
}


export default QuestionInput;