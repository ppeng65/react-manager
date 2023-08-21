// 工具函数

import { Menu } from '@/types/api'

// 千分位金额
// export const formatNum2 = (num: number | string) => {
//     if (!num) return 0
//     const a = parseFloat(num.toString())
//     return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
// }

export const formatNum = (num: number | string) => {
    if (!num) return 0
    const a = num.toString()
    return a.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 格式化日期
export const toLocalDate = (date?: Date, rule?: string) => {
    let curDate
    if (date instanceof Date) curDate = date
    else if (date) curDate = new Date(date)
    else curDate = new Date()

    if (rule === 'yyyy-MM-dd') return curDate.toLocaleDateString()
    if (rule === 'HH:mm:ss') return curDate.toLocaleTimeString()
    return curDate.toLocaleString()
}

export const toLocalDate2 = (date?: Date | string, rule?: string) => {
    let curDate
    if (date instanceof Date) curDate = date
    else if (date) curDate = new Date(date)
    else curDate = new Date()

    let fmt = rule || 'yyyy-MM-dd HH:mm:ss'
    fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())

    type OType = {
        [key: string]: number
    }
    const O: OType = {
        'M+': curDate.getMonth() + 1,
        'd+': curDate.getDate(),
        'H+': curDate.getHours(),
        'h+': curDate.getHours() > 12 ? curDate.getHours() - 12 : curDate.getHours(),
        'm+': curDate.getMinutes(),
        's+': curDate.getSeconds()
    }
    for (const k in O) {
        const val = O[k].toString()
        fmt = fmt.replace(new RegExp(`(${k})`), `00${val}`.substring(val.length))
    }

    return fmt
}

export const formatState = (state: number) => {
    if (state === 1) return '在职'
    if (state === 2) return '离职'
    if (state === 3) return '试用期'
}

export const getMenuPath = (list: Menu.MenuItem[]): string[] => {
    return list.reduce((result: string[], item: Menu.MenuItem) => {
        return result.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path)
    }, [])
}

export const searchRoute: any = (path: string, routes: any = []) => {
    for (const item of routes) {
        if (item.path === path) return item
        if (item.children) {
            const route = searchRoute(path, item.children)
            if (route) return route
        }
    }

    return null
}

// 根据pathname 获取路由数组
export const findTreeNode = (tree: Menu.MenuItem[], pathname: string, path: string[]): string[] => {
    if (!tree?.length) return []
    for (const node of tree) {
        path.push(node.menuName)
        if (pathname === node.path) return path
        if (node.children?.length) {
            const list = findTreeNode(node.children, pathname, path)
            if (list.length) return list
        }
        path.pop()
    }
    return []
}
