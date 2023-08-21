import { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Space, Table } from 'antd'

import { ColumnsType } from 'antd/es/table'
import { Role } from '@/types/api'
import { IAction } from '@/types/modal'

import api from '@/api'
import { toLocalDate2 } from '@/utils'
import CreateRole from './CreateRole'
import { message, modal } from '@/utils/AntdGlobal'
import SetPermission from './SetPermission'

export default () => {
    const [form] = Form.useForm()
    const [dataSource, setDataSource] = useState<Role.RoleItem[]>([])

    const columns: ColumnsType<Role.RoleItem> = [
        { title: '角色名称', dataIndex: 'roleName' },
        { title: '备注', dataIndex: 'remark' },
        { title: '创建时间', dataIndex: 'createTime', render: val => toLocalDate2(val) },
        { title: '更新时间', dataIndex: 'updateTime', render: val => toLocalDate2(val) },
        {
            title: '操作',
            render(record: Role.RoleItem) {
                return (
                    <Space>
                        <Button type='text' onClick={() => onHandleEdit(record)}>
                            编辑
                        </Button>
                        <Button type='text' onClick={() => onHandleSetPermission(record)}>
                            设置权限
                        </Button>
                        <Button type='text' danger onClick={() => onHandleDelete(record)}>
                            删除
                        </Button>
                    </Space>
                )
            }
        }
    ]

    const roleModalRef = useRef<{ open: (type: IAction, data?: Role.RoleItem) => void }>()
    const PermissionModalRef = useRef<{ open: (type: IAction, data?: Role.RoleItem) => void }>()

    useEffect(() => {
        getRoleList()
    }, [])

    const getRoleList = async () => {
        const data = await api.getRoleList(form.getFieldsValue())
        setDataSource(data.list)
    }

    const onHandleReset = () => {
        form.resetFields()
    }

    const onHandleCreate = () => {
        roleModalRef.current?.open('create')
    }

    const onHandleEdit = (record: Role.RoleItem) => {
        roleModalRef.current?.open('edit', record)
    }

    const onHandleSetPermission = (record: Role.RoleItem) => {
        PermissionModalRef.current?.open('edit', record)
    }

    const onHandleDelete = (record: Role.RoleItem) => {
        modal.confirm({
            title: '确认删除',
            content: '确认删除该角色吗？',
            onOk: async () => {
                await api.delteRole({ _id: record._id })
                message.success('删除成功')
                getRoleList()
            }
        })
    }

    return (
        <div className='user-list'>
            <Form form={form} layout='inline' className='search-form'>
                <Form.Item label='角色名称' name='roleName'>
                    <Input placeholder='角色名称' />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' className='mr10' onClick={getRoleList}>
                        搜索
                    </Button>
                    <Button type='default' onClick={onHandleReset}>
                        重置
                    </Button>
                </Form.Item>
            </Form>

            <div className='base-table'>
                <div className='header-wrap'>
                    <div className='title'>角色列表</div>
                    <div className='action'>
                        <Button type='primary' onClick={() => onHandleCreate()}>
                            新增
                        </Button>
                    </div>
                </div>
                <Table bordered rowKey='_id' columns={columns} dataSource={dataSource} pagination={false} />
            </div>

            <CreateRole mRef={roleModalRef} update={getRoleList} />

            {/* 设置权限 */}
            <SetPermission mRef={PermissionModalRef} update={getRoleList} />
        </div>
    )
}
