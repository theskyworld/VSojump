import { Checkbox, Form, Input } from "antd";
import { FC, useEffect } from "react";
import { QuestionInfoProps } from "./questionInfo";


const QuestionInfoProp: FC<QuestionInfoProps> = (props: QuestionInfoProps) => {
    const { title, description, onChange, disabled } = props;
    const { TextArea } = Input;
    const [form] = Form.useForm();

    function handleValuesChange() {
        if (onChange) {
            onChange(form.getFieldsValue())
        }
    }

    useEffect(() => {
        form.setFieldsValue({ title, description })
    }, [title, description])

    return (
        <Form onValuesChange={handleValuesChange} layout="vertical" initialValues={{ title, description }} disabled={disabled} form={form}>
            <Form.Item label='标题' name="title" rules={[
                {
                    required: true,
                    message: "请输入问卷标题!"
                } 
            ]}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="描述">
                <TextArea/>
            </Form.Item>
        </Form>
    )
}

export default QuestionInfoProp;