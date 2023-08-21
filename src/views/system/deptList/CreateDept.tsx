import api from '@/api'
import { Dept, User } from '@/types/api'
import { IAction, IModalProps } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { Form, Input, Modal, Select, TreeSelect } from 'antd'
import { useEffect, useImperativeHandle, useState } from 'react'

export default (props: IModalProps<Dept.EditParams>) => {
    const [form] = Form.useForm()
    const [action, setAction] = useState<IAction>('create')
    const [visible, setVisible] = useState<boolean>(false)
    const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
    const [userList, setUserList] = useState<User.UserInfo[]>([])

    useEffect(() => {
        getUserList()
    }, [])

    useImperativeHandle(props.mRef, () => ({
        open
    }))

    const getDeptList = async () => {
        const data = await api.getDeptList()
        setDeptList(data)
    }

    const getUserList = async () => {
        const data = await api.getAllUserList()
        setUserList(data)
    }

    const open = (type: IAction, data?: Dept.EditParams | { parentId: string }) => {
        getDeptList()
        setAction(type)
        if (data) {
            form.setFieldsValue(data)
        }
        setVisible(true)
    }

    const onHanleSubmit = async () => {
        const valid = await form.validateFields()
        if (valid) {
            if (action === 'create') {
                await api.createDept(valid)
                message.success('添加成功')
            } else {
                await api.editDept(valid)
                message.success('编辑成功')
            }
        }
        onHanleCancel()
        props.update()
    }

    const onHanleCancel = () => {
        form.resetFields()
        setVisible(false)
    }

    return (
        <Modal
            title={action === 'create' ? '创建用户' : '编辑用户'}
            width={800}
            open={visible}
            onOk={onHanleSubmit}
            onCancel={onHanleCancel}
        >
            <Form form={form} layout='horizontal' labelCol={{ span: 4 }} labelAlign='right'>
                <Form.Item hidden name='_id'>
                    <Input />
                </Form.Item>
                <Form.Item label='上级部门' name='parentId'>
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder='请选择上级部门'
                        allowClear
                        treeDefaultExpandAll
                        treeData={deptList}
                        fieldNames={{
                            label: 'deptName',
                            value: '_id'
                        }}
                    />
                </Form.Item>
                <Form.Item label='部门名称' name='deptName' rules={[{ required: true, message: '请选择部门名称' }]}>
                    <Input placeholder='请选择部门名称' />
                </Form.Item>
                <Form.Item label='负责人' name='userName' rules={[{ required: true, message: '请选择负责人' }]}>
                    <Select placeholder='请选择负责人'>
                        {userList?.map((item: User.UserInfo) => {
                            return (
                                <Select.Option key={item._id} value={item._id}>
                                    {item.userName}
                                </Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}
