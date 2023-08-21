import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

function NotFount() {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/')
    }

    return (
        <Result
            status={403}
            title='403'
            subTitle='抱歉，您当前没有权限访问次页面'
            extra={
                <Button type='primary' onClick={handleClick}>
                    回首页
                </Button>
            }
        ></Result>
    )
}

export default NotFount
