import { Radio, Space, Typography } from "antd";
import { FC } from "react";
import getRandomId from "../../../assets/utils/getRandomId";
import { QuestionRadioProps } from "./questionRadio";

export const defaultQuestionRadioProp : QuestionRadioProps = {
    title: "单选标题",
    isVertical: false,
    options: [
        { id : getRandomId(5), value: "item1", text: "选项1" },
        { id: getRandomId(5), value: "item2", text: "选项2" },
        { id: getRandomId(5), value: "item3", text: "选项3" },
    ],
    value : "",
}

const QuestionRadio: FC<QuestionRadioProps> = (props: QuestionRadioProps) => {
    const { title, isVertical, options = [], value = "" } = { ...defaultQuestionRadioProp, ...props };
    const { Paragraph } = Typography;

    return (
        <div>
            <Paragraph strong>{title}</Paragraph>
            <Radio.Group value={value}>
                <Space direction={isVertical ? "vertical" : "horizontal"}>
                    {
                        options.map((option, index) => {
                            const {id, value, text } = option;
                            return <Radio key={id} value={value}>{text}</Radio>
                        })
                    }
                </Space>
            </Radio.Group>
        </div>
    )
}


export default QuestionRadio;