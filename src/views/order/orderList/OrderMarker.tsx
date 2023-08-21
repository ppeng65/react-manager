import { useImperativeHandle, useState } from 'react'
import { Modal } from 'antd'

import { IDetailProps } from '@/types/modal'
import { Order } from '@/types/api'

import api from '@/api'
import { message } from '@/utils/AntdGlobal'

export default (props: IDetailProps) => {
    const [visible, setVisible] = useState(false)
    const [orderId, setOrderId] = useState('')
    const [markers, setMarkers] = useState<{ lng: string; lat: string; id: number }[]>([])

    useImperativeHandle(props.mRef, () => ({ open }))

    const open = async (orderId: string) => {
        setVisible(true)
        setOrderId(orderId)

        const data = await api.getOrderDetail(orderId)
        renderMap(data)
    }

    const renderMap = (detail: Order.OrderItem) => {
        const map = new window.BMapGL.Map('map')
        map.centerAndZoom(detail.cityName, 12)
        map.enableScrollWheelZoom()

        const scaleCtrl = new window.BMapGL.ScaleControl() // 添加比例尺控件
        map.addControl(scaleCtrl)
        const zoomCtrl = new window.BMapGL.ZoomControl() // 添加缩放控件
        map.addControl(zoomCtrl)

        map.addEventListener('click', (e: any) => {
            const { latlng } = e
            createMarker(map, latlng.lng, latlng.lat)
        })

        detail.route?.map(item => {
            createMarker(map, item.lng, item.lat)
        })
    }

    const createMarker = (map: any, lng: string, lat: string) => {
        const id = Math.random()
        const marker = new window.BMapGL.Marker(new window.BMapGL.Point(lng, lat))
        marker.id = id
        markers.push({ lng, lat, id })

        const callback = () => {
            const index = markers.findIndex(item => item.id === marker.id)
            markers.splice(index, 1)
            setMarkers([...markers])

            map.removeOverlay(marker)
        }

        const markerMenu = new window.BMapGL.ContextMenu()
        markerMenu.addItem(new window.BMapGL.MenuItem('删除', callback))

        marker.addContextMenu(markerMenu)
        map.addOverlay(marker)
    }

    const onHandleSumbit = async () => {
        await api.updateOrderInfo({
            orderId,
            route: markers
        })

        message.success('打点成功')
        props.update && props.update()
        onHandleCancel()
    }

    const onHandleCancel = () => {
        setMarkers([])
        setVisible(false)
    }

    return (
        <Modal open={visible} title='地图打点' width={'90%'} onOk={onHandleSumbit} onCancel={onHandleCancel}>
            <div id='map' style={{ height: 500 }}></div>
        </Modal>
    )
}
