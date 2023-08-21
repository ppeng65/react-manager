import { useEffect } from 'react'
import { Dropdown, Switch } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import type { MenuProps } from 'antd'

import Breadcrumb from './Breadcrumb'
import styled from './style.module.less'
import storage from '@/utils/storage'
import { useStore } from '@/store'

const NavHeader = () => {
    const { userInfo, collapsed, isDark, updateCollapsed, updateTheme } = useStore()

    const menusList: MenuProps['items'] = [
        {
            key: 'email',
            label: `邮箱：${userInfo.userEmail}`
        },
        {
            key: 'logout',
            label: '退出'
        }
    ]

    useEffect(() => {
        onHandleSwitchChange(isDark)
    }, [])

    const onToggleCollapsed = () => {
        updateCollapsed()
    }

    const onHandleSwitchChange = (isDark: boolean) => {
        if (isDark) {
            document.documentElement.dataset.theme = 'dark'
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.dataset.theme = 'light'
            document.documentElement.classList.remove('dark')
        }

        storage.set('isDark', isDark)
        updateTheme(isDark)
    }

    const onClick: MenuProps['onClick'] = ({ key }) => {
        if (key === 'logout') {
            storage.remove('token')
            location.href = '/#/login?callback=' + encodeURIComponent(location.href)
        }
    }

    return (
        <div className={styled.navHeader}>
            <div className={styled.left}>
                <div onClick={onToggleCollapsed}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
                <Breadcrumb />
            </div>
            <div className={styled.right}>
                <Switch
                    checked={isDark}
                    checkedChildren='暗黑'
                    unCheckedChildren='默认'
                    style={{ marginRight: 10 }}
                    onChange={onHandleSwitchChange}
                />
                <Dropdown menu={{ items: menusList, onClick }} trigger={['click']}>
                    <span>{userInfo.userName}</span>
                </Dropdown>
            </div>
        </div>
    )
}

export default NavHeader
