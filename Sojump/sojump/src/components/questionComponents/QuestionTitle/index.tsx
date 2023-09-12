import { Typography } from "antd";
import { FC } from "react"
import { QuestionTitleProps } from "./questionTitle";

export const defaultQuestionTitleProps: QuestionTitleProps = {
    text: "一行标题",
    level: 1,
    isCenter: false,
}

const QuestionTitle: FC<QuestionTitleProps> = (props: QuestionTitleProps) => {
    const { text = "", level = 1, isCenter = false } = { ...defaultQuestionTitleProps, ...props };
    const { Title } = Typography;


    function genFontSize(level: number) {
        switch (level) {
            case 1:
                return "24px";
            case 2:
                return "20px";
            case 3:
                return "16px";
            case 4:
                return "14px";
            case 5:
                return "12px";
            default:
                return "16px";
        }
    }

    return (
        <div>
            <Title level={level} style={{ textAlign: isCenter ? "center" : "start", marginBottom: "0", fontSize: genFontSize(level) }}>
                {text}
            </Title>
        </div>
    )
}

export default QuestionTitle;