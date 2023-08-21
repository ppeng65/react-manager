import mockjs from 'mockjs'

// 上传图片
mockjs.mock('/api/users/upload', 'post', options => {
    return {
        code: 0,
        msg: '',
        data: {
            file: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'
        }
    }
})
