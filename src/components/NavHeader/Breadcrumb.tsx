import { ReactNode, useEffect, useState } from 'react'
import { useLocation, useRouteLoaderData } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { IAuthLoader } from '@/router/AuthLoader'
import { findTreeNode } from '@/utils'

export default () => {
    const [breadList, setBreadList] = useState<(string | ReactNode)[]>([])

    const { pathname } = useLocation()
    const data = useRouteLoaderData('layout') as IAuthLoader

    useEffect(() => {
        const list = findTreeNode(data.menuList, pathname, [])
        setBreadList(list)
    }, [pathname])

    return <Breadcrumb items={breadList.map(title => ({ title }))} style={{ marginLeft: 10 }} />
}
