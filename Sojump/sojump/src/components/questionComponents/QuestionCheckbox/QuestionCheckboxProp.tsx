import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import { FC, useEffect } from "react";
import getRandomId from "../../../assets/utils/getRandomId";
import { QuestionCheckboxProps } from "./questionCheckbox";
import { QuestionCheckboxOption } from "./questionCheckbox";

const QuestionCheckboxProp: FC<QuestionCheckboxProps> = (props: QuestionCheckboxProps) => {
    const { title, isVertical, list = [], value = "", onChange, disabled } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ title, isVertical, list, value })
    }, [title, isVertical, list, value])
    // 当属性组件中内容发生变化时，将变化同步到对应的组件中
    function handleValuesChange() {
        if (!onChange) return;
        const newValues = form.getFieldsValue();
        onChange(newValues);
    };

    return (
        <Form layout='vertical' initialValues={{ title, isVertical, value, list }} onValuesChange={handleValuesChange} disabled={disabled} form={form}>
            {/* 标题 */}
            <Form.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题" }]}>
                <Input />
            </Form.Item>
            {/* 选项列表 */}
            <Form.Item label="选项">
                <Form.List name="list">
                    {(fields, { add, remove }) => (<>
                        {
                            // 遍历展示所有的选项
                            fields.map(({ key, name }, index) => {
                                return (<Space key={key} align="baseline">
                                    <Form.Item name={[name, "isChecked"]} valuePropName="checked">
                                        <Checkbox/>
                                    </Form.Item>
                                    <Form.Item name={[name, "text"]} rules={[
                                        {
                                            required: true,
                                            message: "请输入选项文本!"
                                        },
                                        {
                                            // 验证当前选项的内容是否与其它选项重复
                                            validator(_, text) {
                                                // text为当前选项中的文本内容
                                                // 获取当前form中的所有选项
                                                const { list = [] } = form.getFieldsValue();
                                                let num = 0; // 记录所有选项中跟当前选项中文本内容相同的选项个数，不重复的话值将为1，否则大于1
                                                list.forEach((l: QuestionCheckboxOption) => {
                                                    if (l.text === text) num++;
                                                });
                                                if (num === 1) return Promise.resolve();
                                                return Promise.reject("和其它选项重复了!")

                                            }
                                        }
                                    ]}>
                                        <Input placeholder="请输入选项文本..." />
                                    </Form.Item>
                                    {/* 删除当前选项的按钮,当存在两个或以上选项时，才允许删除 */}
                                    {fields.length > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                                </Space>)
                            })

                        }
                        {/* 新增新的选项 */}
                        <Form.Item>
                            <Button block type="link" onClick={() => add({ id: getRandomId(5), text: "新的选项", value: "新的选项", isChecked : false })} icon={<PlusOutlined />}>添加选项</Button>
                        </Form.Item>
                    </>)}
                </Form.List>

            </Form.Item>
            {/* 竖向排列 */}
            <Form.Item name="isVertical" valuePropName="checked">
                <Checkbox>竖向排列</Checkbox>
            </Form.Item>
        </Form>
    )
}


export default QuestionCheckboxProp;