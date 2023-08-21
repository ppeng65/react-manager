import { Button, Form, Input, Space, Table } from 'antd'
import { useEffect, useRef, useState } from 'react'

import type { ColumnsType } from 'antd/es/table'
import { IAction } from '@/types/modal'
import { Dept } from '@/types/api'

import api from '@/api'
import { message, modal } from '@/utils/AntdGlobal'
import { toLocalDate2 } from '@/utils'

import CreateDept from './CreateDept'

export default () => {
    const [form] = Form.useForm()

    const columns: ColumnsType<Dept.DeptItem> = [
        { title: '部门名称', dataIndex: 'deptName' },
        { title: '负责人', dataIndex: 'userName' },
        { title: '创建时间', dataIndex: 'createTime', render: val => toLocalDate2(val) },
        { title: '更新时间', dataIndex: 'updateTime', render: val => toLocalDate2(val) },
        {
            title: '操作',
            render(record: Dept.DeptItem) {
                return (
                    <Space>
                        <Button type='text' onClick={() => onHandleCreate(record)}>
                            新增
                        </Button>
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

    const [dataSource, setDataSource] = useState<Dept.DeptItem[]>([])

    const deptModalRef = useRef<{ open: (type: IAction, data?: Dept.EditParams | { parentId: string }) => void }>()

    useEffect(() => {
        getDeptList()
    }, [])

    const getDeptList = async () => {
        const data = await api.getDeptList(form.getFieldsValue())
        setDataSource(data)
    }

    const onHandleReset = () => {
        form.resetFields()
    }

    const onHandleCreate = (record?: Dept.DeptItem) => {
        if (record?.parentId) {
            deptModalRef.current?.open('create', { parentId: record?._id })
        } else {
            deptModalRef.current?.open('create')
        }
    }

    const onHandleEdit = (record: Dept.DeptItem) => {
        deptModalRef.current?.open('edit', record)
    }

    const onHandleDelete = (record: Dept.DeptItem) => {
        modal.confirm({
            title: '确认删除',
            content: '确认删除该部门吗?',
            onOk: () => {
                handleSubmitDelete(record._id)
            }
        })
    }

    const handleSubmitDelete = async (_id: string) => {
        await api.deleteDept({ _id })
        message.success('删除成功')
        getDeptList()
    }

    return (
        <div className='user-list'>
            <Form form={form} layout='inline' className='search-form'>
                <Form.Item label='部门名称' name='deptName'>
                    <Input placeholder='部门名称' />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' className='mr10' onClick={getDeptList}>
                        搜索
                    </Button>
                    <Button type='default' onClick={onHandleReset}>
                        重置
                    </Button>
                </Form.Item>
            </Form>

            <div className='base-table'>
                <div className='header-wrap'>
                    <div className='title'>部门列表</div>
                    <div className='action'>
                        <Button type='primary' onClick={() => onHandleCreate()}>
                            新增
                        </Button>
                    </div>
                </div>
                <Table bordered rowKey='_id' columns={columns} dataSource={dataSource} pagination={false} />
            </div>

            <CreateDept mRef={deptModalRef} update={getDeptList} />
        </div>
    )
}
