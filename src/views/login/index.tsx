import { useState } from 'react'
import { Button, Form, Input } from 'antd'

import { Login } from '@/types/api.ts'

import api from '@/api'
import storage from '@/utils/storage.ts'
import { message } from '@/utils/AntdGlobal.tsx'
import { useStore } from '@/store'

import styled from './style.module.less'

export default function () {
    const [loading, setLoading] = useState(false)
    const [initFormData] = useState<Login.params>({
        userName: 'JackMa',
        userPwd: '123456'
    })
    const setToken = useStore(state => state.setToken)

    const onFinish = async (values: Login.params) => {
        try {
            setLoading(true)
            const data = await api.login(values)
            setLoading(false)
            storage.set('token', data)
            setToken(data)
            message.success('登录成功')
            const params = new URLSearchParams(location.search)
            setTimeout(() => {
                location.href = params.get('callback') || '/welcome'
            })
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <div className={styled.login}>
            <div className={styled.loginWrapper}>
                <div className={styled.title}>系统登录</div>
                <Form name='basic' initialValues={initFormData} onFinish={onFinish} autoComplete='off'>
                    <Form.Item name='userName' rules={[{ required: true, message: '请输入用户名' }]}>
                        <Input placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item name='userPwd' rules={[{ required: true, message: '请输入登录密码' }]}>
                        <Input.Password placeholder='请输入登录密码' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' block htmlType='submit' loading={loading}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
