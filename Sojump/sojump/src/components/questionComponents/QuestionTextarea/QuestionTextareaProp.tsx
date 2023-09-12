// 当前组件对应的右侧栏中属性一栏中对应的组件

import { Form, Input } from "antd";
import { FC, useEffect } from "react";
import { QuestionTextareaProps } from "./questionTextarea";

const QuestionTextareaProp: FC<QuestionTextareaProps> = (props: QuestionTextareaProps) => {
    const { title, placeholder, onChange, disabled } = props;

    // 当在画布中点击选中不同的QuestionTextarea组件时，右侧对应的属性组件的title和placeholder也进行改变
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({ title, placeholder })
    }, [title, placeholder])


    // 当右侧栏中属性中的值发生变化时，将变化同步到画布中对应的组件上
    function handleValueChange() {
        // 将变化后的值统一传递到上级Prop组件中，由Prop组件统一对对应画布中组件的内容进行修改
        if (onChange) {
            onChange(form.getFieldsValue());
        }
    }

    // 对于QuestionTextarea对应的属性组件，使用表格进行展示
    return (
        <Form disabled={disabled} layout="vertical" initialValues={{ title, placeholder }} form={form} onValuesChange={handleValueChange}>
            <Form.Item label="标题" name="title" rules={[
                {
                    required: true,
                    message : "请输入标题!"
                }
            ]}>
                <Input/>
            </Form.Item>
            <Form.Item label="placeholder" name="placeholder">
                <Input />
            </Form.Item>
        </Form>
    )
}

export default QuestionTextareaProp;