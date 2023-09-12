import { Checkbox, Form, Input } from "antd";
import { FC, useEffect } from "react";
import { QuestionParagraphProps } from "./questionParagraph";


const QuestionParagraphProp: FC<QuestionParagraphProps> = (props: QuestionParagraphProps) => {
    const { text, isCenter, onChange, disabled } = props;
    const { TextArea } = Input;
    const [form] = Form.useForm();

    function handleValuesChange() {
        if (onChange) {
            onChange(form.getFieldsValue())
        }
    }

    useEffect(() => {
        form.setFieldsValue({ text, isCenter })
    }, [text, isCenter])

    return (
        <Form onValuesChange={handleValuesChange} layout="vertical" initialValues={{ text, isCenter }} disabled={disabled} form={form}>
            <Form.Item label='段落内容' name="text" rules={[
                {
                    required: true,
                    message : "请输入段落内容!"
                }
            ]}> 
                <TextArea/>
            </Form.Item>
            <Form.Item name="isCenter" valuePropName="checked">
                <Checkbox>居中显示</Checkbox>
            </Form.Item>
        </Form>
    )
}

export default QuestionParagraphProp;