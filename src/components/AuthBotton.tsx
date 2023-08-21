import { Button } from 'antd'
import { useRouteLoaderData } from 'react-router-dom'

import { IAuthLoader } from '@/router/AuthLoader'
import { useStore } from '@/store'

export default (props: any) => {
    const data = useRouteLoaderData('layout') as IAuthLoader
    const roleId = useStore(state => state.userInfo.role)

    if (!props.auth) return <Button {...props}>{props.children}</Button>
    if (data.buttonList.includes(props.auth) || roleId === 1) {
        return <Button {...props}>{props.children}</Button>
    }

    return <></>
}
