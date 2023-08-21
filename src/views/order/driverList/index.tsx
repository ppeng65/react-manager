import { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Table } from 'antd'

import { Driver } from '@/types/api'
import { ColumnsType } from 'antd/es/table'

import api from '@/api'
import { toLocalDate2 } from '@/utils'

const DRIVER_STATE = [
    {
        label: '待认证',
        value: 0
    },
    {
        label: '正常',
        value: 1
    },
    {
        label: '暂时拉黑',
        value: 2
    },
    {
        label: '永久拉黑',
        value: 3
    },
    {
        label: '停止推送',
        value: 4
    }
]

export default () => {
    const [form] = Form.useForm()
    const [total, setTotal] = useState(0)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    })
    const [dataSource, setDataSource] = useState<Driver.DriverItem[]>([])

    const columns: ColumnsType<Driver.DriverItem> = [
        { title: '司机名称', dataIndex: 'driverName', width: 100, fixed: 'left' },
        {
            title: '司机信息',
            width: 180,
            fixed: 'left',
            render(record: Driver.DriverItem) {
                return (
                    <>
                        <p>司机ID:{record.driverId}</p>
                        <p>手机号码:{record.driverPhone}</p>
                        <p>注册城市:{record.cityName}</p>
                        <p>会员等级:{record.grade}</p>
                        <p>司机等级:{record.driverLevel}</p>
                    </>
                )
            }
        },
        {
            title: '司机状态',
            dataIndex: 'accountStatus',
            width: 100,
            render(val) {
                const findItem = DRIVER_STATE.find(item => item.value === val)
                return findItem?.label || ''
            }
        },
        {
            title: '车辆信息',
            width: 190,
            render(record: Driver.DriverItem) {
                return (
                    <>
                        <p>车辆信息:{record.carNo}</p>
                        <p>车辆品牌:{record.vehicleBrand}</p>
                        <p>车辆名称:{record.vehicleName}</p>
                    </>
                )
            }
        },
        { title: '昨日在线时长', dataIndex: 'onlineTime', width: 120 },
        { title: '昨日司机流水', dataIndex: 'driverAmount', width: 120 },
        { title: '司机评分', dataIndex: 'rating', width: 100 },
        { title: '行为分', dataIndex: 'driverScore', width: 100 },
        { title: '昨日推单数', dataIndex: 'pushOrderCount', width: 120 },
        { title: '昨日完单数', dataIndex: 'orderCompleteCount', width: 120 },
        { title: '加入时间', dataIndex: 'createTime', width: 200, render: val => toLocalDate2(val) }
    ]

    useEffect(() => {
        getDriverList({ pageNum: pagination.current, pageSize: pagination.pageSize })
    }, [pagination.current, pagination.pageSize])

    const getDriverList = async (params?: Driver.Params) => {
        const values = form.getFieldsValue()
        const data = await api.getDriverList({
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

    return (
        <div className='user-list'>
            <Form form={form} initialValues={{ accountStatus: 1 }} layout='inline' className='search-form'>
                <Form.Item label='司机名称' name='driverName'>
                    <Input placeholder='请输入司机名称' />
                </Form.Item>
                <Form.Item label='司机状态' name='accountStatus'>
                    <Select placeholder='请选择司机状态' style={{ width: 160 }}>
                        {DRIVER_STATE.map(item => (
                            <Select.Option key={item.value} value={item.value}>
                                {item.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' className='mr10' onClick={getDriverList}>
                        搜索
                    </Button>
                    <Button type='default' onClick={onHandleReset}>
                        重置
                    </Button>
                </Form.Item>
            </Form>

            <div className='base-table'>
                <div className='header-wrap'>
                    <div className='title'>司机列表</div>
                </div>
                <Table
                    bordered
                    rowKey='id'
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{ x: '50%' + 700 }}
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
        </div>
    )
}
