import { useImperativeHandle, useState } from 'react'
import { Modal } from 'antd'

import { IDetailProps } from '@/types/modal'

import api from '@/api'
import { Order } from '@/types/api'
import { message } from '@/utils/AntdGlobal'

export default (props: IDetailProps) => {
    const [visible, setVisible] = useState(false)
    const [trackAni, setTrackAni] = useState<{ cancel: () => void }>()

    useImperativeHandle(props.mRef, () => ({
        open
    }))

    const open = async (orderId: string) => {
        const data = await api.getOrderDetail(orderId)
        if (data.route?.length) {
            setVisible(true)
            setTimeout(() => {
                renderMap(data)
            })
        } else {
            message.info('请先完成打点上报')
        }
    }

    const renderMap = (detail: Order.OrderItem) => {
        const map = new window.BMapGL.Map('map')
        map.centerAndZoom(detail.cityName, 17)
        map.enableScrollWheelZoom()

        const point: any[] = []
        detail.route?.map(item => {
            point.push(new window.BMapGL.Point(item.lng, item.lat))
            createMarker(map, item.lng, item.lat)
        })

        const pl = new window.BMapGL.Polyline(point, {
            strokeWeight: 8,
            strokeOpacity: 0.8,
            strokeColor: '#ed6c00'
        })

        const trackAni = new window.BMapGLLib.TrackAnimation(map, pl, {
            overallView: true, // 动画完成后自动调整视野到总览
            tilt: 30, // 轨迹播放的角度，默认为55
            duration: 20000 // 动画持续时长，默认为10000，单位ms
        })

        setTrackAni(trackAni)
        setTimeout(() => {
            trackAni.start()
        }, 1000)
    }

    const createMarker = (map: any, lng: string, lat: string) => {
        const marker = new window.BMapGL.Marker(new window.BMapGL.Point(lng, lat))

        map.addOverlay(marker)
    }

    const onHandleCancel = () => {
        setVisible(false)
        trackAni?.cancel()
    }

    return (
        <Modal open={visible} title='订单轨迹' width={800} footer={false} onCancel={onHandleCancel}>
            <div id='map' style={{ height: 500 }}></div>
        </Modal>
    )
}
