import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import { Menu } from 'antd'
import * as Icons from '@ant-design/icons'

import type { MenuProps } from 'antd'
import { Menu as IMenu } from '@/types/api'
import { useStore } from '@/store'

import styled from './style.module.less'

type MenuItem = Required<MenuProps>['items'][number]

const Menus = () => {
    const navigate = useNavigate()
    const { collapsed, isDark } = useStore(state => ({ collapsed: state.collapsed, isDark: state.isDark }))
    const [menuList, setMenuList] = useState<MenuItem[]>([])
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const [openKeys, setOpenKeys] = useState<string[]>([])
    const data: any = useRouteLoaderData('layout')
    let rootSubmenuKeys: string[] = []

    const { pathname } = useLocation()
    data.menuList?.forEach((item: IMenu.MenuItem) => {
        if (item?.children?.length && !item.buttons) {
            rootSubmenuKeys.push(item.path)
        }
    })

    useEffect(() => {
        const list: MenuItem[] = getTreeMenu(data.menuList)
        setMenuList(list)
    }, [])

    useEffect(() => {
        const key = rootSubmenuKeys.find(item => pathname.search(item) > -1)
        key && setOpenKeys([key])
        setSelectedKeys([pathname])
    }, [pathname])

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group'
    ): MenuItem {
        return {
            label,
            key,
            icon,
            children,
            type
        } as MenuItem
    }

    const createIcon = (name?: string) => {
        if (!name) return <></>
        const CustomIcons: { [key: string]: any } = Icons
        const Icon = CustomIcons[name]
        if (!Icon) return <></>
        return React.createElement(Icon)
    }

    const getTreeMenu = (list: IMenu.MenuItem[], treeList: MenuItem[] = []) => {
        list?.forEach((item: IMenu.MenuItem) => {
            if (item.menuType === 1 && item.menuState === 1) {
                let menu
                if (item.buttons?.length) {
                    menu = getItem(item.menuName, item.path || item._id, createIcon(item.icon))
                } else {
                    menu = getItem(
                        item.menuName,
                        item.path || item._id,
                        createIcon(item.icon),
                        getTreeMenu(item.children || [])
                    )
                }
                treeList.push(menu)
            }
        })

        return treeList
    }

    const handleClickLogo = () => {
        navigate('/')
    }

    const onHandleCLickMenu = ({ key }: { key: string }) => {
        setSelectedKeys([key])
        navigate(key)
    }

    const onOpenChange: MenuProps['onOpenChange'] = keys => {
        if (keys?.length) {
            const key = keys.slice(keys.length - 1)
            setOpenKeys(key)
            // setOpenKeys(keys)
        } else {
            setOpenKeys([])
        }
    }

    return (
        <div className={styled.navWrap}>
            <div className={styled.logoWrap} onClick={handleClickLogo}>
                <img src='/imgs/logo.png' className={styled.logo} alt='' />
                {collapsed ? '' : <span>后台管理</span>}
            </div>
            <Menu
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                mode='inline'
                theme={isDark ? 'light' : 'dark'}
                style={{ minHeight: 'calc(100% - 50px)' }}
                items={menuList}
                onClick={onHandleCLickMenu}
                onOpenChange={onOpenChange}
            />
        </div>
    )
}

export default Menus
