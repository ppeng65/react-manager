import { Form, Input, InputNumber, Modal, Radio, TreeSelect } from 'antd'
import { useImperativeHandle, useState } from 'react'
import { InfoCircleOutlined } from '@ant-design/icons'

import { IAction, IModalProps } from '@/types/modal'
import { Menu } from '@/types/api'
import api from '@/api'
import { message } from '@/utils/AntdGlobal'

export default (props: IModalProps<Menu.EditParams> & { menuList: Menu.MenuItem[] }) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [action, setAction] = useState<IAction>('create')
    const [form] = Form.useForm()

    useImperativeHandle(props.mRef, () => ({
        open
    }))

    const open = (type: IAction, data?: Menu.EditParams | { parentId?: string; orderBy?: number }) => {
        setAction(type)
        setVisible(true)
        if (data) {
            form.setFieldsValue(data)
        }
    }

    const onHanleSubmit = async () => {
        const valid = await form.validateFields()
        if (valid) {
            if (action === 'create') {
                await api.createMenu(form.getFieldsValue())
                message.success('添加成功')
            } else {
                await api.editMenu(form.getFieldsValue())
                message.success('编辑成功')
            }
            onHanleCancel()
            props.update()
        }
    }

    const onHanleCancel = () => {
        form.resetFields()
        setVisible(false)
    }

    return (
        <Modal
            open={visible}
            title={action === 'create' ? '创建菜单' : '编辑菜单'}
            width={800}
            onOk={onHanleSubmit}
            onCancel={onHanleCancel}
        >
            <Form
                form={form}
                layout='horizontal'
                labelCol={{ span: 4 }}
                labelAlign='right'
                initialValues={{ menuType: 1, menuState: 1 }}
            >
                <Form.Item name='_id' hidden>
                    <Input />
                </Form.Item>
                <Form.Item label='父级菜单' name='parentId'>
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder='请选择父级菜单'
                        allowClear
                        treeDefaultExpandAll
                        treeData={props.menuList}
                        fieldNames={{
                            label: 'menuName',
                            value: '_id'
                        }}
                    />
                </Form.Item>
                <Form.Item label='菜单类型' name='menuType'>
                    <Radio.Group>
                        <Radio value={1}>菜单</Radio>
                        <Radio value={2}>按钮</Radio>
                        <Radio value={3}>页面</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label='菜单名称' name='menuName' rules={[{ required: true, message: '请输入菜单名称' }]}>
                    <Input placeholder='请输入菜单名称' />
                </Form.Item>
                <Form.Item label='菜单图标' name='icon'>
                    <Input placeholder='请输入菜单图标' />
                </Form.Item>
                <Form.Item noStyle shouldUpdate>
                    {() => {
                        return form.getFieldValue('menuType') === 2 ? (
                            <Form.Item label='权限标识' name='menuCode'>
                                <Input placeholder='请输入权限标识' />
                            </Form.Item>
                        ) : (
                            <>
                                <Form.Item label='路由地址' name='path'>
                                    <Input placeholder='请输入路由地址' />
                                </Form.Item>
                                <Form.Item label='组件地址' name='component'>
                                    <Input placeholder='请输入组件地址' />
                                </Form.Item>
                            </>
                        )
                    }}
                </Form.Item>
                <Form.Item
                    label='排序'
                    name='orderBy'
                    tooltip={{ title: '排序值越大越靠后', icon: <InfoCircleOutlined /> }}
                >
                    <InputNumber placeholder='排序值' />
                </Form.Item>
                <Form.Item label='菜单状态' name='menuState'>
                    <Radio.Group>
                        <Radio value={1}>启用</Radio>
                        <Radio value={2}>停用</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    )
}
