import axios from 'axios'
import { hideLoading, showLoading } from '@/utils/loading'
import storage from '@/utils/storage.ts'
import { RequestResult } from '@/types/api.ts'
import { message } from '@/utils/AntdGlobal.tsx'

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API + '/api',
    timeout: 1000 * 60,
    timeoutErrorMessage: '请求超时，请稍后再试',
    withCredentials: true
})

instance.interceptors.request.use(
    config => {
        if (config.showLoading) showLoading()
        const token = storage.get('token')
        if (token) {
            config.headers.Authorization = 'Bearer ' + token
        }

        return { ...config }
    },
    error => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    response => {
        hideLoading()
        if (response.config.responseType === 'blob') return response
        const data: RequestResult = response.data
        if (data.code === 500001) {
            message.error(data.msg)
            storage.remove('token')
            location.href = '/login?callback' + encodeURIComponent(location.href)
        } else if (data.code != 0) {
            if (response.config.showError) {
                message.error(data.msg)
                return Promise.reject(data)
            } else {
                return Promise.resolve(data)
            }
        }

        return data.data
    },
    error => {
        hideLoading()
        message.error(error.message)
        return Promise.reject(error)
    }
)

interface IConfig {
    showLoading?: boolean
    showError?: boolean
}

export default {
    get<T>(url: string, params?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
        return instance.get(url, { params, ...options })
    },
    post<T>(url: string, params?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
        return instance.post(url, params, options)
    },
    download(url: string, data: any, fileName = 'fileName.xlsx') {
        instance({
            url,
            data,
            method: 'post',
            responseType: 'blob'
        }).then(_response => {
            // const blob = new Blob(response.data, {
            //     type: response.data.type
            // })

            const link = document.createElement('a')
            link.download = decodeURIComponent(fileName)
            // link.href = URL.createObjectURL(blob)
            link.href = '/订单列表.xlsx'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(link.href)
        })
    }
}
