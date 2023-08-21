import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import { Tabs } from 'antd'
import { IAuthLoader } from '@/router/AuthLoader'
import { searchRoute } from '@/utils'

export default () => {
    const [activeKey, setActiveKeys] = useState('/welcome')
    const [tabList, setTabList] = useState<{ key: string; label: string; closable: boolean }[]>([
        {
            key: '/welcome',
            label: '首页',
            closable: false
        }
    ])

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const data = useRouteLoaderData('layout') as IAuthLoader

    useEffect(() => {
        addRoute()
    }, [pathname])

    const addRoute = () => {
        const route = searchRoute(pathname, data.menuList)
        if (!route) {
            setActiveKeys(pathname)
            return
        }
        if (!tabList.find(item => item.key === route.path)) {
            tabList.push({
                key: route.path,
                label: route.menuName,
                closable: true
            })

            setTabList([...tabList])
        }

        setActiveKeys(route.path)
    }

    const onHandleChange = (key: string) => {
        navigate(key)
    }

    const onEdit = (key: string) => {
        if (activeKey === key) {
            const findIndex = tabList.findIndex(item => item.key === key)
            const newKey = (tabList[findIndex + 1] || tabList[findIndex - 1]).key
            navigate(newKey)
        }

        setTabList([...tabList.filter(item => item.key !== key)])
    }

    return (
        <Tabs
            activeKey={activeKey}
            type='editable-card'
            hideAdd
            items={tabList}
            tabBarStyle={{ marginBottom: 0, backgroundColor: 'var(--bg-color)' }}
            onChange={onHandleChange}
            onEdit={key => onEdit(key as string)}
        />
    )
}
