import { Typography, Input } from "antd";
import { FC } from "react";
import { QuestionInfoProps } from "./questionInfo";



export const defaultQuestionInfoProps: QuestionInfoProps = {
    title: "问卷标题",
    description: "问卷描述",
}

const QuestionInput: FC<QuestionInfoProps> = (props: QuestionInfoProps) => {
    const { title = "", description = "" } = { ...defaultQuestionInfoProps, ...props };
    const { Paragraph, Title } = Typography;

    const descriptionTextList = description.split("\n");


    return (
        <div style={{textAlign : "center"}}>
            <Title style={{ fontSize: "24px" }}>{ title}</Title>
            <Paragraph>
                {descriptionTextList.map((t, index) => {
                    return <span key={index}>
                        {/* 为第一个之外的每一个span标签后面添加<br/>用于换行 */}
                        {index > 0 && <br />}
                        {t}
                    </span>
                })}
            </Paragraph>
        </div>
    )
}


export default QuestionInput;