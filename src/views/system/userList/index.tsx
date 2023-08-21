import { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Select, Space, Table } from 'antd'

import type { ColumnsType } from 'antd/es/table'
import { PageParams, User } from '@/types/api'
import { IAction } from '@/types/modal'
import AuthBotton from '@/components/AuthBotton'

import api from '@/api'
import { formatState, toLocalDate2 } from '@/utils'
import { message, modal } from '@/utils/AntdGlobal'

import CreateUser from './CreateUser'

export default () => {
    const [form] = Form.useForm()
    const [total, setTotal] = useState(0)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    })
    const [dataSource, setDataSource] = useState<User.UserInfo[]>([])
    const [userIds, setUserIds] = useState<number[]>([])

    const columns: ColumnsType<User.UserInfo> = [
        { title: '用户ID', dataIndex: 'userId' },
        { title: '用户名称', dataIndex: 'userName' },
        { title: '用户邮箱', dataIndex: 'userEmail' },
        {
            title: '用户角色',
            dataIndex: 'role',
            render(role: number) {
                return {
                    0: '超级管理员',
                    1: '管理员',
                    2: '体验管理员',
                    3: '普通用户'
                }[role]
            }
        },
        {
            title: '用户状态',
            dataIndex: 'state',
            render(state: number) {
                return formatState(state)
            }
        },
        {
            title: '注册时间',
            dataIndex: 'createTime',
            render(createTime: string) {
                return toLocalDate2(createTime)
            }
        },
        {
            title: '最后登录时间',
            dataIndex: 'lastLoginTime',
            render(lastLoginTime: string) {
                return toLocalDate2(lastLoginTime)
            }
        },
        {
            title: '操作',
            render(record) {
                return (
                    <Space>
                        <Button type='text' onClick={() => onHandleEdit(record)}>
                            编辑
                        </Button>
                        <Button type='text' danger onClick={() => onHandleDelete(record)}>
                            删除
                        </Button>
                    </Space>
                )
            }
        }
    ]

    const modelRef = useRef<{
        open: (type: IAction, data?: User.UserInfo) => void
    }>()

    useEffect(() => {
        getUserList({ pageNum: pagination.current, pageSize: pagination.pageSize })
    }, [pagination.current, pagination.pageSize])

    const getUserList = async (params?: PageParams) => {
        const values = form.getFieldsValue()
        const data = await api.getSystemUserList({
            pageNum: params?.pageNum || 1,
            pageSize: params?.pageSize || pagination.pageSize,
            ...values
        })

        setDataSource(data?.list || [])
        setTotal(data?.page?.total)
    }

    const onHandleSearch = () => {
        getUserList()
    }

    const onHandleReset = () => {
        form.resetFields()
    }

    const onHandleCreate = () => {
        modelRef.current?.open('create')
    }

    const onHandleEdit = (record: User.UserInfo) => {
        modelRef.current?.open('edit', record)
    }

    const onHandleDelete = (record: User.UserInfo) => {
        modal.confirm({
            title: '删除确认',
            content: <span>确认删除该用户吗？</span>,
            onOk: () => {
                deleteUser([record.userId])
            }
        })
    }

    const onHandlePatchDelete = () => {
        if (!userIds?.length) {
            message.error('请选择需要删除的用户')
            return
        }
        modal.confirm({
            title: '删除确认',
            content: <span>确认删除该批用户吗？</span>,
            onOk: () => {
                deleteUser(userIds)
            }
        })
    }

    const deleteUser = async (userIds: number[]) => {
        await api.deleteUser({
            userIds
        })
        message.success('删除成功')
        getUserList()
        setUserIds([])
    }

    return (
        <div className='user-list'>
            <Form form={form} initialValues={{ state: 0 }} layout='inline' className='search-form'>
                <Form.Item name='userId' label='用户ID'>
                    <Input placeholder='请输入用户ID' />
                </Form.Item>
                <Form.Item name='userName' label='用户名称'>
                    <Input placeholder='请输入用户名称' />
                </Form.Item>
                <Form.Item name='state' label='状态'>
                    <Select style={{ width: 120 }}>
                        <Select.Option value={0}>全部</Select.Option>
                        <Select.Option value={1}>在职</Select.Option>
                        <Select.Option value={2}>离职</Select.Option>
                        <Select.Option value={3}>试用期</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' className='mr10' onClick={onHandleSearch}>
                        搜索
                    </Button>
                    <Button type='default' onClick={onHandleReset}>
                        重置
                    </Button>
                </Form.Item>
            </Form>

            <div className='base-table'>
                <div className='header-wrap'>
                    <div className='title'>用户列表</div>
                    <div className='action'>
                        <AuthBotton auth='user@create' type='primary' onClick={onHandleCreate}>
                            新增
                        </AuthBotton>
                        <Button type='primary' danger onClick={onHandlePatchDelete}>
                            批量删除
                        </Button>
                    </div>
                </div>
                <Table
                    bordered
                    rowSelection={{
                        type: 'checkbox',
                        selectedRowKeys: userIds,
                        onChange: (selectedRowKeys: React.Key[]) => {
                            setUserIds(selectedRowKeys as number[])
                        }
                    }}
                    rowKey='userId'
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{
                        position: ['bottomRight'],
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: total => `共 ${total} 条`,
                        onChange: (current, pageSize) => {
                            setPagination({
                                current,
                                pageSize
                            })
                        }
                    }}
                />
            </div>

            <CreateUser
                mRef={modelRef}
                update={() => {
                    getUserList()
                }}
            />
        </div>
    )
}
