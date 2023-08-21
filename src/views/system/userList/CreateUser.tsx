import { useEffect, useImperativeHandle, useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Select, TreeSelect, Upload, UploadProps } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/es/upload'

import { IAction, IModalProps } from '@/types/modal'
import { Dept, Role, User } from '@/types/api'

import api from '@/api'
import { message } from '@/utils/AntdGlobal'

export default (props: IModalProps) => {
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)
    const [action, setAction] = useState<IAction>('create')
    const [loading, setLoading] = useState(false)
    const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
    const [roleList, setRoleList] = useState<Role.RoleItem[]>([])
    const [imageUrl, setImageUrl] = useState<string>()

    useEffect(() => {
        getDeptList()
        getAllRole()
    }, [])

    useImperativeHandle(props.mRef, () => ({
        open
    }))

    const open = (type: IAction, data?: User.UserInfo) => {
        setAction(type)
        setVisible(true)
        if (type === 'edit' && data) {
            form.setFieldsValue(data)
            setImageUrl(data.userImg)
        }
    }

    const getDeptList = async () => {
        const data = await api.getDeptList()
        setDeptList(data)
    }

    const getAllRole = async () => {
        const data = await api.getAllRole()
        setRoleList(data)
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>上传</div>
        </div>
    )

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }

        if (info.file.status === 'done') {
            setLoading(false)
            setImageUrl(info.file.response.data.file)
        }
    }

    const onHanleSubmit = async () => {
        const valid = await form.validateFields()
        const params = {
            ...valid,
            userImg: imageUrl
        }
        if (action === 'create') {
            await api.createUser(params)
            message.success('添加成功')
        } else {
            await api.editUser(params)
            message.success('编辑成功')
        }

        onHanleCancel()
        props.update()
    }

    const onHanleCancel = () => {
        form.resetFields()
        setImageUrl('')
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
                <Form.Item label='用户Id' name='userId' hidden>
                    <Input type='number' />
                </Form.Item>
                <Form.Item label='用户名称' name='userName' rules={[{ required: true, message: '请输入用户名称' }]}>
                    <Input placeholder='请输入用户名称' />
                </Form.Item>
                <Form.Item label='用户邮箱' name='userEmail' rules={[{ required: true, message: '请输入用户邮箱' }]}>
                    <Input placeholder='请输入用户邮箱' />
                </Form.Item>
                <Form.Item label='手机号' name='mobile'>
                    <Input type='number' maxLength={11} placeholder='请输入手机号' />
                </Form.Item>
                <Form.Item label='部门' name='deptId' rules={[{ required: true, message: '请选择部门' }]}>
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder='请选择部门'
                        allowClear
                        treeDefaultExpandAll
                        treeData={deptList}
                        fieldNames={{
                            label: 'deptName',
                            value: '_id'
                        }}
                    />
                </Form.Item>
                <Form.Item label='岗位' name='job'>
                    <Input placeholder='请输入岗位' />
                </Form.Item>
                <Form.Item label='状态' name='state'>
                    <Select placeholder='请输入岗位'>
                        <Select.Option value={1}>在职</Select.Option>
                        <Select.Option value={2}>离职</Select.Option>
                        <Select.Option value={3}>试用期</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label='角色' name='roleList'>
                    <Select placeholder='请选择角色'>
                        {roleList.map((item: Role.RoleItem) => {
                            return (
                                <Select.Option key={item._id} value={item._id}>
                                    {item.roleName}
                                </Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label='用户头像'>
                    <Upload
                        name='avatar'
                        listType='picture-card'
                        className='avatar-uploader'
                        showUploadList={false}
                        action={'/api/users/upload'}
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                            <img src={imageUrl} alt='avatar' style={{ width: '100%', borderRadius: '50%' }} />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}
