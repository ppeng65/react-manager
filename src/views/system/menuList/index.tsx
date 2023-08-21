import { Button, Form, Input, Select, Space, Table } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { ColumnsType } from 'antd/es/table'
import { Menu } from '@/types/api'
import { IAction } from '@/types/modal'

import CreateMenu from './CreateMenu'
import { message, modal } from '@/utils/AntdGlobal'
import { toLocalDate2 } from '@/utils'
import api from '@/api'

export default () => {
    const [form] = Form.useForm()

    const columns: ColumnsType<Menu.MenuItem> = [
        { title: '菜单名称', dataIndex: 'menuName', width: 150 },
        { title: '图标', dataIndex: 'icon', width: 200 },
        {
            title: '菜单类型',
            dataIndex: 'menuType',
            render: (val: number) => {
                return { 1: '菜单', 2: '按钮', 3: '页面' }[val]
            }
        },
        { title: '权限标识', dataIndex: 'menuCode', width: 160 },
        { title: '路由地址', dataIndex: 'path' },
        { title: '组件路径', dataIndex: 'component' },
        { title: '创建时间', dataIndex: 'createTime', render: val => toLocalDate2(val) },
        {
            title: '操作',
            render(record: any) {
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
    const [dataSource, setDataSource] = useState<Menu.MenuItem[]>([])
    const menuModalRef = useRef<{
        open: (type: IAction, data?: Menu.EditParams | { parentId?: string; orderBy?: number }) => void
    }>()

    useEffect(() => {
        getMenuList()
    }, [])

    const getMenuList = async () => {
        const data = await api.getMenuList()
        setDataSource(data)
    }

    const onHandleReset = () => {
        form.resetFields()
    }

    const onHandleCreate = (record?: Menu.MenuItem) => {
        if (record?._id) {
            menuModalRef.current?.open('create', { parentId: record._id, orderBy: record?.children?.length || 0 })
        } else {
            menuModalRef.current?.open('create', { orderBy: dataSource.length || 0 })
        }
    }

    const onHandleEdit = (record: Menu.MenuItem) => {
        menuModalRef.current?.open('edit', record)
    }

    const onHandleDelete = (record: Menu.MenuItem) => {
        let text = ''
        if (record.menuType === 1) {
            text = '菜单'
        } else if (record.menuType === 2) {
            text = '按钮'
        } else {
            text = '页面'
        }
        modal.confirm({
            title: '确认删除',
            content: `确认删除该${text}吗?`,
            onOk() {
                handleSubmitDelete(record._id)
            }
        })
    }

    const handleSubmitDelete = async (_id: string) => {
        await api.deleteMenu({ _id })
        message.success('删除成功')
        getMenuList()
    }

    return (
        <div className='user-list'>
            <Form form={form} initialValues={{ menuState: 1 }} layout='inline' className='search-form'>
                <Form.Item name='menuName' label='菜单名称'>
                    <Input placeholder='请输入菜单名称' />
                </Form.Item>
                <Form.Item name='menuState' label='菜单状态'>
                    <Select placeholder='请选择菜单状态' style={{ width: 120 }}>
                        <Select.Option value={1}>正常</Select.Option>
                        <Select.Option value={2}>停用</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' className='mr10' onClick={getMenuList}>
                        搜索
                    </Button>
                    <Button type='default' onClick={onHandleReset}>
                        重置
                    </Button>
                </Form.Item>
            </Form>

            <div className='base-table'>
                <div className='header-wrap'>
                    <div className='title'>菜单列表</div>
                    <div className='action'>
                        <Button type='primary' onClick={() => onHandleCreate()}>
                            新增
                        </Button>
                    </div>
                </div>

                <Table bordered rowKey='_id' columns={columns} dataSource={dataSource} pagination={false} />
            </div>

            <CreateMenu mRef={menuModalRef} menuList={dataSource} update={getMenuList} />
        </div>
    )
}
