import { RouterProvider } from 'react-router-dom'
import { App as AntdApp, ConfigProvider, theme } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import AntdGlobal from '@/utils/AntdGlobal.tsx'
import router from './router'
import { useStore } from './store'
import './App.less'
import './styles/theme.less'

function App() {
    const isDark = useStore(state => state.isDark)

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ed6c00'
                },
                algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
            }}
            locale={zhCN}
        >
            <AntdApp>
                <AntdGlobal />
                <RouterProvider router={router} />
            </AntdApp>
        </ConfigProvider>
    )
}

export default App
