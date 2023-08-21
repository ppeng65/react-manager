import { Menu } from '@/types/api'

import api from '@/api'
import { getMenuPath } from '@/utils'

export interface IAuthLoader {
    buttonList: string[]
    menuList: Menu.MenuItem[]
    menuPathList: string[]
}

export default async () => {
    const data = await api.getPermissionList()
    const menuPathList = getMenuPath(data.menuList || []) || []

    return {
        buttonList: data.buttonList || [],
        menuList: data.menuList || [],
        menuPathList
    }
}
