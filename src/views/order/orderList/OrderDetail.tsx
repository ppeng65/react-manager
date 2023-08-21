import { Descriptions, Modal } from 'antd'
import { useImperativeHandle, useState } from 'react'

import { IDetailProps } from '@/types/modal'
import { Order } from '@/types/api'

import api from '@/api'
import { toLocalDate2 } from '@/utils'

export default (props: IDetailProps) => {
    const [visible, setVisible] = useState(false)
    const [detail, setDetail] = useState<Order.OrderItem>()

    useImperativeHandle(props.mRef, () => ({
        open
    }))

    const open = async (orderId: string) => {
        setVisible(true)
        const data = await api.getOrderDetail(orderId)
        setDetail(data)
    }

    const onHandleCancel = () => {
        setVisible(false)
    }

    const formatState = (state?: Order.IState) => {
        if (!state) return '-'
        if (state === 1) return '进行中'
        if (state === 2) return '已完成'
        if (state === 3) return '超时'
        if (state === 4) return '取消'
    }

    return (
        <Modal open={visible} title='订单详情' width={800} footer={false} onCancel={onHandleCancel}>
            <Descriptions column={2} style={{ padding: '10px 30px' }}>
                <Descriptions.Item label='订单编号'>{detail?.orderId}</Descriptions.Item>
                <Descriptions.Item label='下单城市'>{detail?.cityName}</Descriptions.Item>

                <Descriptions.Item label='下单用户'>{detail?.userName}</Descriptions.Item>
                <Descriptions.Item label='手机号'>{detail?.mobile}</Descriptions.Item>

                <Descriptions.Item label='起点'>{detail?.startAddress}</Descriptions.Item>
                <Descriptions.Item label='终点'>{detail?.endAddress}</Descriptions.Item>

                <Descriptions.Item label='订单金额'>{detail?.orderAmount}</Descriptions.Item>
                <Descriptions.Item label='用户支付金额'>{detail?.userPayAmount}</Descriptions.Item>

                <Descriptions.Item label='司机到账金额'>{detail?.driverAmount}</Descriptions.Item>
                <Descriptions.Item label='支付方式'>{detail?.payType === 1 ? '微信' : '支付宝'}</Descriptions.Item>

                <Descriptions.Item label='司机名称'>{detail?.driverName}</Descriptions.Item>
                <Descriptions.Item label='订单车型'>{detail?.vehicleName}</Descriptions.Item>

                <Descriptions.Item label='订单状态'>{formatState(detail?.state)}</Descriptions.Item>
                <Descriptions.Item label='用车时间'>{toLocalDate2(detail?.useTime)}</Descriptions.Item>

                <Descriptions.Item label='订单结束时间'>{toLocalDate2(detail?.endTime)}</Descriptions.Item>
                <Descriptions.Item label='订单创建时间'>{toLocalDate2(detail?.createTime)}</Descriptions.Item>
            </Descriptions>
        </Modal>
    )
}
