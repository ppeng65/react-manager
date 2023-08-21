import { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Select, Space, Table, message } from 'antd'

import { Order } from '@/types/api'
import { ColumnsType } from 'antd/es/table'
import CreateOrder from './CreateOrder'
import OrderDetail from './OrderDetail'
import OrderMarker from './OrderMarker'
import OrderRoute from './OrderRoute'

import api from '@/api'
import { toLocalDate2 } from '@/utils'
import { modal } from '@/utils/AntdGlobal'

export default () => {
    const [form] = Form.useForm()
    const [total, setTotal] = useState(0)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    })
    const [dataSource, setDataSource] = useState<Order.OrderItem[]>([])

    const columns: ColumnsType<Order.OrderItem> = [
        { title: '订单编号', dataIndex: 'orderId' },
        { title: '城市', dataIndex: 'cityName' },
        {
            title: '下单地址',
            dataIndex: 'address',
            render(_, record) {
                return (
                    <>
                        <p>开始地址：{record.startAddress}</p>
                        <p>结束地址：{record.endAddress}</p>
                    </>
                )
            }
        },
        { title: '下单时间', dataIndex: 'createTime', render: val => toLocalDate2(val) },
        { title: '订单价格', dataIndex: 'orderAmount' },
        {
            title: '订单状态',
            dataIndex: 'state',
            render(val: number) {
                return {
                    1: '进行中',
                    2: '已完成',
                    3: '超时',
                    4: '取消'
                }[val]
            }
        },
        { title: '用户名称', dataIndex: 'userName' },
        { title: '司机名称', dataIndex: 'driverName' },
        {
            title: '操作',
            render(record: Order.OrderItem) {
                return (
                    <Space>
                        <Button type='text' onClick={() => onHandleDetail(record)}>
                            详情
                        </Button>
                        <Button type='text' onClick={() => onHandleMarker(record)}>
                            打点
                        </Button>
                        <Button type='text' onClick={() => onHandleRoute(record)}>
                            轨迹
                        </Button>
                        <Button type='text' danger onClick={() => onHandleDelete(record)}>
                            删除
                        </Button>
                    </Space>
                )
            }
        }
    ]

    const orderModalRef = useRef<{ open: () => void }>()
    const orderDetailRef = useRef<{ open: (orderId: string) => void }>()
    const orderMarkerRef = useRef<{ open: (orderId: string) => void }>()
    const orderRouteRef = useRef<{ open: (orderId: string) => void }>()

    useEffect(() => {
        getOrderList({ pageNum: pagination.current, pageSize: pagination.pageSize })
    }, [pagination.current, pagination.pageSize])

    const getOrderList = async (params?: Order.Params) => {
        const values = form.getFieldsValue()
        const data = await api.getOrderList({
            pageNum: params?.pageNum || 1,
            pageSize: params?.pageSize || pagination.pageSize,
            ...values
        })

        setDataSource(data?.list || [])
        setTotal(data?.page?.total)
    }

    const onHandleReset = () => {
        form.resetFields()
    }

    const onHandleCreate = () => {
        orderModalRef.current?.open()
    }

    const onHandleExport = () => {
        api.exportOrder(form.getFieldsValue())
    }

    const onHandleDetail = (record: Order.OrderItem) => {
        orderDetailRef.current?.open(record.orderId)
    }

    const onHandleMarker = (record: Order.OrderItem) => {
        orderMarkerRef.current?.open(record.orderId)
    }

    const onHandleRoute = (record: Order.OrderItem) => {
        orderRouteRef.current?.open(record.orderId)
    }

    const onHandleDelete = (record: Order.OrderItem) => {
        modal.confirm({
            title: '确认删除',
            content: '确认删除该订单吗？',
            onOk: async () => {
                await api.deleteOrder(record._id)
                message.success('删除成功')
                getOrderList()
            }
        })
    }

    return (
        <div className='user-list'>
            <Form form={form} layout='inline' className='search-form'>
                <Form.Item label='订单编号' name='orderId'>
                    <Input placeholder='请输入订单编号' />
                </Form.Item>
                <Form.Item label='用户名称' name='userName'>
                    <Input placeholder='请输入用户名称' />
                </Form.Item>
                <Form.Item label='订单状态' name='state'>
                    <Select placeholder='请选择订单状态' style={{ width: 120 }}>
                        <Select.Option value={1}>进行中</Select.Option>
                        <Select.Option value={2}>已完成</Select.Option>
                        <Select.Option value={3}>超时</Select.Option>
                        <Select.Option value={4}>取消</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' className='mr10' onClick={getOrderList}>
                        搜索
                    </Button>
                    <Button type='default' onClick={onHandleReset}>
                        重置
                    </Button>
                </Form.Item>
            </Form>

            <div className='base-table'>
                <div className='header-wrap'>
                    <div className='title'>订单列表</div>
                    <div className='action'>
                        <Button type='primary' onClick={() => onHandleCreate()}>
                            新增
                        </Button>
                        <Button type='primary' onClick={() => onHandleExport()}>
                            导出
                        </Button>
                    </div>
                </div>
                <Table
                    bordered
                    rowKey='_id'
                    columns={columns}
                    dataSource={dataSource}
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

            <CreateOrder mRef={orderModalRef} update={getOrderList} />
            <OrderDetail mRef={orderDetailRef} />
            <OrderMarker mRef={orderMarkerRef} update={getOrderList} />
            <OrderRoute mRef={orderRouteRef} />
        </div>
    )
}
