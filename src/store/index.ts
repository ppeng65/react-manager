import { create } from 'zustand'
import { User } from '@/types/api'
import storage from '@/utils/storage'

export const useStore = create<{
    token: string
    userInfo: User.UserInfo
    collapsed: boolean
    isDark: boolean
    setToken: (token: string) => void
    setUserInfo: (userInfo: User.UserInfo) => void
    updateCollapsed: () => void
    updateTheme: (isDark: boolean) => void
}>(set => ({
    token: '',
    userInfo: {
        _id: '',
        userId: 0,
        userName: '',
        userEmail: '',
        deptId: '',
        state: 0,
        role: 0,
        roleList: '',
        deptName: '',
        userImg: '',
        job: '',
        mobile: '',
        createId: 0
    },
    collapsed: false,
    isDark: storage.get('isDark') || false,
    setToken: (token: string) => set({ token }),
    setUserInfo: (userInfo: User.UserInfo) => set({ userInfo }),
    updateCollapsed: () => set(state => ({ collapsed: !state.collapsed })),
    updateTheme: (isDark: boolean) => set({ isDark })
}))
