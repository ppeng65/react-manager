import { Form, Input, Modal } from 'antd'
import { useImperativeHandle, useState } from 'react'

import { Role } from '@/types/api'
import { IAction, IModalProps } from '@/types/modal'

import api from '@/api'
import { message } from '@/utils/AntdGlobal'

export default (props: IModalProps<Role.RoleItem>) => {
    const [visible, setVisible] = useState(false)
    const [action, setAction] = useState<IAction>('create')
    const [form] = Form.useForm()

    useImperativeHandle(props.mRef, () => ({
        open
    }))

    const open = (type: IAction, data?: Role.RoleItem) => {
        setVisible(true)
        setAction(type)
        if (data) {
            form.setFieldsValue(data)
        }
    }

    const onHandleOk = async () => {
        const valid = await form.validateFields()
        if (valid) {
            if (action === 'create') {
                await api.createRole(form.getFieldsValue())
                message.success('创建成功')
            } else {
                await api.editRole(form.getFieldsValue())
                message.success('编辑成功')
            }

            onHandleCancel()
            props.update()
        }
    }

    const onHandleCancel = () => {
        form.resetFields()
        setVisible(false)
    }

    return (
        <Modal
            open={visible}
            title={action === 'create' ? '创建角色' : '编辑角色'}
            width={800}
            onOk={onHandleOk}
            onCancel={onHandleCancel}
        >
            <Form form={form} layout='horizontal' labelCol={{ span: 4 }} labelAlign='right'>
                <Form.Item name='_id' hidden>
                    <Input />
                </Form.Item>
                <Form.Item label='角色名称' name='roleName' rules={[{ required: true, message: '请输入角色名称' }]}>
                    <Input placeholder='请输入角色名称' />
                </Form.Item>
                <Form.Item label='备注' name='remark'>
                    <Input.TextArea placeholder='请输入备注' />
                </Form.Item>
            </Form>
        </Modal>
    )
}
