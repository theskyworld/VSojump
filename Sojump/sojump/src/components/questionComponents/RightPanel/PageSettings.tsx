// 页面设置
import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import useGetPageSetting from '../../../hooks/useGetPageSetting'
import {initPageSetting } from '../../../store/PageSettingReducer'

const { TextArea } = Input

const PageSetting: FC = () => {
    const pageSetting = useGetPageSetting()
    // const { title, desc, js, css } = PageSetting
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    // 实时更新表单内容
    useEffect(() => {
        form.setFieldsValue(pageSetting)
    }, [pageSetting])

    function handleValuesChange() {
        dispatch(initPageSetting(form.getFieldsValue()))
    }

    return (
        <Form
            layout="vertical"
            initialValues={pageSetting}
            onValuesChange={handleValuesChange}
            form={form}
        >
            <Form.Item label="问卷标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
                <Input placeholder="请输入标题" />
            </Form.Item>
            <Form.Item label="问卷描述" name="desc">
                <TextArea placeholder="问卷描述..." />
            </Form.Item>
            <Form.Item label="样式代码" name="css">
                <TextArea placeholder="输入 CSS 样式代码..." />
            </Form.Item>
            <Form.Item label="脚本代码" name="js">
                <TextArea placeholder="输入 JS 脚本代码..." />
            </Form.Item>
        </Form>
    )
}

export default PageSetting
