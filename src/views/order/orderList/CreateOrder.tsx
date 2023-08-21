import { useEffect, useImperativeHandle, useState } from 'react'
import { Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import { IModalProps } from '@/types/modal'
import { Order } from '@/types/api'

import api from '@/api'
import { message } from '@/utils/AntdGlobal'

dayjs.locale('zh-cn')

export default (props: IModalProps) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const [cityList, setCityList] = useState<Order.DictItem[]>([])
    const [vehicleList, setCehicleList] = useState<Order.DictItem[]>([])

    useEffect(() => {
        getCityList()
        getVehicleList()
    }, [])

    const getCityList = async () => {
        const data = await api.getCityList()
        setCityList(data)
    }

    const getVehicleList = async () => {
        const data = await api.getVehicleList()
        setCehicleList(data)
    }

    useImperativeHandle(props.mRef, () => ({
        open
    }))

    const open = () => {
        setVisible(true)
    }

    const onHandleSubmit = async () => {
        const valid = await form.validateFields()
        if (valid) {
            await api.createOrder(valid)
            message.success('创建成功')
            onHandleCancel()
            props.update()
        }
    }

    const onHandleCancel = () => {
        form.resetFields()
        setVisible(false)
    }

    return (
        <Modal open={visible} title='创建订单' width={800} onOk={onHandleSubmit} onCancel={onHandleCancel}>
            <Form
                form={form}
                initialValues={{ payType: 1, state: 1 }}
                layout='horizontal'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                labelAlign='right'
            >
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label='城市名称'
                            name='cityName'
                            rules={[{ required: true, message: '请选择城市名称' }]}
                        >
                            <Select placeholder='请选择城市名称'>
                                {cityList.map((item: Order.DictItem) => (
                                    <Select.Option key={item.id} value={item.name}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='车型' name='vehicleName' rules={[{ required: true, message: '请选择车型' }]}>
                            <Select placeholder='请选择车型'>
                                {vehicleList.map((item: Order.DictItem) => (
                                    <Select.Option key={item.id} value={item.name}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label='用户名称'
                            name='userName'
                            rules={[{ required: true, message: '请输入用户名称' }]}
                        >
                            <Input placeholder='请输入用户名称' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='手机号' name='mobile'>
                            <Input type='number' placeholder='请输入手机号' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label='起始地址' name='startAddress'>
                            <Input placeholder='请输入起始地址' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='结束地址' name='endAdress'>
                            <Input placeholder='请输入结束地址' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label='下单金额'
                            name='orderAmount'
                            rules={[{ required: true, message: '请输入下单金额' }]}
                        >
                            <Input type='number' placeholder='请输入下单金额' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='支付金额'
                            name='userPayAmount'
                            rules={[{ required: true, message: '请输入支付金额' }]}
                        >
                            <Input type='number' placeholder='请输入支付金额' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label='司机名称'
                            name='driverName'
                            rules={[{ required: true, message: '请输入司机名称' }]}
                        >
                            <Input placeholder='请输入司机名称' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='司机金额'
                            name='driverAmount'
                            rules={[{ required: true, message: '请输入司机金额' }]}
                        >
                            <Input type='number' placeholder='请输入司机金额' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label='支付方式' name='payType'>
                            <Select placeholder='请选择支付方式'>
                                <Select.Option value={1}>微信</Select.Option>
                                <Select.Option value={2}>支付宝</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='订单状态' name='state'>
                            <Select placeholder='请选择订单状态'>
                                <Select.Option value={1}>进行中</Select.Option>
                                <Select.Option value={2}>已完成</Select.Option>
                                <Select.Option value={3}>超时</Select.Option>
                                <Select.Option value={4}>取消</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label='用车时间' name='useTime'>
                            <DatePicker format='YYYY-MM-DD HH:mm:ss' showTime />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='结束时间' name='endTime'>
                            <DatePicker format='YYYY-MM-DD HH:mm:ss' showTime />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
