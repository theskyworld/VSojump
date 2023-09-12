import { Typography } from "antd";
import { FC } from "react";
import { QuestionParagraphProps } from "./questionParagraph";


export const defaultQuestionParagraphProps : QuestionParagraphProps = {
    text: "一行段落",
    isCenter: false
}

const QuestionParagraph: FC<QuestionParagraphProps> = (props: QuestionParagraphProps) => {
    const { text = "", isCenter = false } = { ...defaultQuestionParagraphProps, ...props };
    const { Paragraph } = Typography;

    const textList = text.split("\n"); // 属性组件表单中的段落内容以\n作为换行标记
    return (
        <Paragraph style={{textAlign : isCenter ? "center" : "start", marginBottom : "0"}}>
            {textList.map((t, index) => {
                return <span key={index}>
                    {/* 为第一个之外的每一个span标签后面添加<br/>用于换行 */}
                    {index > 0  && <br/> }
                    {t}
                </span>
            })}
        </Paragraph>
    )
}


export default QuestionParagraph;