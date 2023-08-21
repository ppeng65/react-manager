import React from 'react'
import { createHashRouter, Navigate } from 'react-router-dom'
import Login from '@/views/login'
import Layout from '@/layout'
import Error404 from '@/views/404'
import Error403 from '@/views/403'
import Welcome from '@/views/welcome'

import AuthLoader from './AuthLoader'
import { lazyLoader } from './lazyLoader'

const router = [
    {
        path: '/',
        element: <Navigate to='/welcome' />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        id: 'layout',
        element: <Layout />,
        loader: AuthLoader,
        children: [
            {
                path: '/welcome',
                element: <Welcome />
            },
            {
                path: '/dashboard',
                element: lazyLoader(React.lazy(() => import('../views/dashboard')))
            },
            {
                path: '/system/userList',
                element: lazyLoader(React.lazy(() => import('../views/system/userList'))),
                meta: {
                    auth: false
                }
            },
            {
                path: '/system/menuList',
                element: lazyLoader(React.lazy(() => import('../views/system/menuList')))
            },
            {
                path: '/system/roleList',
                element: lazyLoader(React.lazy(() => import('../views/system/roleList')))
            },
            {
                path: '/system/deptList',
                element: lazyLoader(React.lazy(() => import('../views/system/deptList')))
            },
            {
                path: '/order/orderList',
                element: lazyLoader(React.lazy(() => import('../views/order/orderList')))
            },
            {
                path: '/order/orderCluster',
                element: lazyLoader(React.lazy(() => import('../views/order/orderCluster')))
            },
            {
                path: '/order/driverList',
                element: lazyLoader(React.lazy(() => import('../views/order/driverList')))
            }
        ]
    },
    {
        path: '/404',
        element: <Error404 />
    },
    {
        path: '/403',
        element: <Error403 />
    },
    {
        path: '*',
        element: <Navigate to='/404' />
    }
]

// export default function () {
//   return useRoutes(router)
// }
export default createHashRouter(router)
