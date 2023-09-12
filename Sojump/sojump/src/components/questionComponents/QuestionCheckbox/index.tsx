import { Checkbox, Space, Typography } from "antd";
import { FC } from "react";
import getRandomId from "../../../assets/utils/getRandomId";
import { QuestionCheckboxProps } from "./questionCheckbox";

export const defaultQuestionCheckboxProp : QuestionCheckboxProps = {
    title: "多选标题",
    isVertical: false,
    list: [
        { id : getRandomId(5), value: "item1", text: "选项1", isChecked : false },
        { id: getRandomId(5), value: "item2", text: "选项2", isChecked: false },
        { id: getRandomId(5), value: "item3", text: "选项3", isChecked: false },
    ],
    value : "",
}

const QuestionCheckbox: FC<QuestionCheckboxProps> = (props: QuestionCheckboxProps) => {
    const { title, isVertical, list = [], value = "" } = { ...defaultQuestionCheckboxProp, ...props };
    const { Paragraph } = Typography;

    return (
        <div>
            <Paragraph strong>{title}</Paragraph>
                <Space direction={isVertical ? "vertical" : "horizontal"}>
                    {
                    list.map((list, index) => {
                        const { id, value, text, isChecked } = list;
                            return <Checkbox key={id} value={value} checked={isChecked}>{text}</Checkbox>
                        })
                    }
                </Space>
        </div>
    )
}


export default QuestionCheckbox;