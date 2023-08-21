import { useEffect, useState } from 'react'
import { Select } from 'antd'
import api from '@/api'
import { useStore } from '@/store'

const cityNames = [
    {
        label: '长沙',
        value: '10001'
    },
    {
        label: '武汉',
        value: '20001'
    },
    {
        label: '杭州',
        value: '30001'
    }
]

export default () => {
    const isDark = useStore(state => state.isDark)
    const [cityId, setCityId] = useState('10001')
    const [maps, setMaps] = useState<any>(null)

    useEffect(() => {
        getOrderCluster()
    }, [cityId])

    useEffect(() => {
        maps &&
            maps.setMapStyleV2({
                styleId: isDark ? 'a801e09a76bc67ebdcb1b6d15dd0a6f1' : ''
            })
    }, [isDark])

    const getOrderCluster = async () => {
        const data = await api.orderCluster(cityId)
        setTimeout(() => {
            renderMap(data)
        })
    }

    const renderMap = (data: Array<{ lng: string; lat: string }>) => {
        const map = new window.BMapGL.Map('map')
        setMaps(map)
        const findItem = cityNames.find(item => item.value === cityId)
        map.centerAndZoom(findItem?.label, 10)
        map.enableScrollWheelZoom()

        const scaleCtrl = new window.BMapGL.ScaleControl() // 添加比例尺控件
        map.addControl(scaleCtrl)
        const zoomCtrl = new window.BMapGL.ZoomControl() // 添加缩放控件
        map.addControl(zoomCtrl)

        setTimeout(() => {
            isDark &&
                map.setMapStyleV2({
                    styleId: isDark ? 'a801e09a76bc67ebdcb1b6d15dd0a6f1' : ''
                })
        }, 60)

        const markers: any[] = []
        data.forEach((item: any) => {
            const point = new window.BMapGL.Point(item.lng, item.lat)
            markers.push(new window.BMapGL.Marker(point))
        })

        if (markers.length) {
            new window.BMapLib.MarkerClusterer(map, { markers: markers })
        }
    }

    const onHandleChange = (val: string) => {
        setCityId(val)
    }

    return (
        <div
            style={{ height: 'calc(100vh - 50px - 50px - 40px)', borderRadius: 5, backgroundColor: 'var(--bg-color)' }}
        >
            <Select value={cityId} style={{ width: 120, marginBottom: 10 }} onChange={onHandleChange}>
                {cityNames.map(item => (
                    <Select.Option key={item.value} value={item.value}>
                        {item.label}
                    </Select.Option>
                ))}
            </Select>

            <div id='map' style={{ height: 'calc(100% - 42px)' }}></div>
        </div>
    )
}
