import React, { useEffect } from 'react'
import { Watermark, Layout } from 'antd'
import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router-dom'

import { IAuthLoader } from '@/router/AuthLoader'

import Menus from '@/components/Menus'
import NavHeader from '@/components/NavHeader'
import NavTabs from '@/components/Tabs'
import NavFooter from '@/components/NavFooter'

import styled from './style.module.less'
import api from '@/api'
import { useStore } from '@/store'
import routes from '@/router'
import { searchRoute } from '@/utils'

const LayoutFC: React.FC = () => {
    const { setUserInfo, collapsed } = useStore()

    const { pathname } = useLocation()
    const data = useRouteLoaderData('layout') as IAuthLoader
    const route = searchRoute(pathname, routes.routes)
    const staticPath = ['/welcome', '/404', '/403']

    if (route && route.meta?.auth === false) {
        /* empty */
    } else {
        if (!data.menuPathList.includes(pathname) && !staticPath.includes(pathname)) {
            return <Navigate to='/403' />
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        const data = await api.getUserInfo()
        setUserInfo(data)
    }

    return (
        <Watermark content='react'>
            <Layout>
                <Layout.Sider collapsed={collapsed}>
                    <Menus />
                </Layout.Sider>
                <Layout>
                    <NavHeader />
                    <NavTabs />
                    <Layout.Content className={styled.content}>
                        <div className={styled.wrap}>
                            <Outlet />
                        </div>
                        <NavFooter />
                    </Layout.Content>
                </Layout>
            </Layout>
        </Watermark>
    )
}

export default LayoutFC
