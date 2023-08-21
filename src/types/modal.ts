import { MutableRefObject } from 'react'
import { User } from './api'

export type IAction = 'create' | 'edit' | 'delete'

export interface IModalProps<T = User.UserInfo> {
    mRef: MutableRefObject<{ open: (type: IAction, data?: T) => void } | undefined>
    update: () => void
}

export interface IDetailProps {
    mRef: MutableRefObject<{ open: (orderId: string) => void } | undefined>
    update?: () => void
}
