import styled from './style.module.less'
// console.log(toLocalDate2(new Date('2023-10-20 17:00:00'), 'MM-dd hh:mm'))

export default function () {
    return (
        <div className={styled.welcome}>
            <div className={styled.content}>
                <div className={styled.subTitle}>欢迎体验</div>
                <div className={styled.title}>React18后台管理系统</div>
                <div className={styled.desc}>React18 + ReactRouter6.0 + AntD5.2 + TypeScript + Vite 实现通用后台</div>
            </div>
            <div className={styled.img}></div>
        </div>
    )
}
