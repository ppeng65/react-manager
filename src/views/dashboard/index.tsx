import { Button, Card, Descriptions } from 'antd'
import { useEffect, useState } from 'react'

import { Dashboard } from '@/types/api'

import { useStore } from '@/store'
import { useCharts } from '@/hooks/useCharts'
import { formatNum, formatState } from '@/utils'
import api from '@/api'

import styled from './style.module.less'

export default () => {
    const userInfo = useStore(state => state.userInfo)
    const [report, setReport] = useState<Dashboard.ReportData>({
        driverCount: 0,
        totalMoney: 0,
        orderCount: 0,
        cityNum: 0
    })

    const [lineRef, lineChart] = useCharts()

    const [pieCityRef, pieCityChart] = useCharts()
    const [pieAgeRef, pieAgeChart] = useCharts()
    const [radarRef, radarChart] = useCharts()

    useEffect(() => {
        getReportData()
    }, [])

    useEffect(() => {
        drawLine()
    }, [lineChart])

    useEffect(() => {
        drawPieCity()
    }, [pieCityChart])

    useEffect(() => {
        drawPieAge()
    }, [pieAgeChart])

    useEffect(() => {
        drawRadar()
    }, [radarChart])

    const getReportData = async () => {
        const data = await api.getReportData()
        setReport(data)
    }

    // 折线图
    const drawLine = async () => {
        if (!lineChart) return
        const data = await api.getLineData()

        lineChart.setOption({
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: 50,
                right: 50,
                bottom: 20
            },
            legend: {
                data: ['订单', '流水']
            },
            xAxis: {
                data: data.label
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单',
                    type: 'line',
                    data: data.order
                },
                {
                    name: '流水',
                    type: 'line',
                    data: data.money
                }
            ]
        })
    }

    // 饼图 城市
    const drawPieCity = async () => {
        if (!pieCityChart) return
        const data = await api.getPieCityData()

        pieCityChart?.setOption({
            title: {
                text: '司机城市分布',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            grid: {
                left: 50,
                right: 50,
                bottom: 20
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: '城市分布',
                    type: 'pie',
                    radius: '50%',
                    data
                }
            ]
        })
    }

    // 饼图 年龄
    const drawPieAge = async () => {
        if (!pieAgeChart) return
        const data = await api.getPieAgeData()

        pieAgeChart.setOption({
            title: {
                text: '司机年龄分布',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            grid: {
                left: 50,
                right: 50,
                bottom: 20
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: '年龄分布',
                    type: 'pie',
                    radius: [50, 150],
                    roseType: 'area',
                    data
                }
            ]
        })
    }

    // 雷达图
    const drawRadar = async () => {
        if (!radarChart) return
        const data = await api.getRadarData()

        radarChart.setOption({
            legend: {
                data: ['司机模型诊断']
            },
            radar: {
                indicator: data.indicator
            },
            series: [
                {
                    name: '模型诊断',
                    type: 'radar',
                    data: data.data
                }
            ]
        })
    }

    return (
        <div className={styled.dashboard}>
            <div className={styled.userInfo}>
                <img
                    src={'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'}
                    alt='头像'
                    className={styled.userImg}
                />
                <Descriptions title={`欢迎${userInfo.userName}使用`}>
                    <Descriptions.Item label='用户ID'>{userInfo.userId}</Descriptions.Item>
                    <Descriptions.Item label='邮箱'>{userInfo.userEmail}</Descriptions.Item>
                    <Descriptions.Item label='状态'>{formatState(userInfo.state)}</Descriptions.Item>
                    <Descriptions.Item label='手机号'>{userInfo.mobile}</Descriptions.Item>
                    <Descriptions.Item label='岗位'>{userInfo.job}</Descriptions.Item>
                    <Descriptions.Item label='部门'>{userInfo.deptName}</Descriptions.Item>
                </Descriptions>
            </div>
            <div className={styled.report}>
                <div className={styled.card}>
                    <div className='title'>司机数量</div>
                    <div className={styled.data}>{formatNum(report?.driverCount)}个</div>
                </div>
                <div className={styled.card}>
                    <div className='title'>流水</div>
                    <div className={styled.data}>{formatNum(report?.totalMoney)}元</div>
                </div>
                <div className={styled.card}>
                    <div className='title'>总订单</div>
                    <div className={styled.data}>{formatNum(report?.orderCount)}单</div>
                </div>
                <div className={styled.card}>
                    <div className='title'>开通城市</div>
                    <div className={styled.data}>{formatNum(report?.cityNum)}座</div>
                </div>
            </div>
            <Card
                title='订单和流水走势图'
                extra={
                    <Button type='primary' onClick={drawLine}>
                        刷新
                    </Button>
                }
                className={styled.chart}
            >
                <div ref={lineRef} className={styled.itemChart} />
            </Card>
            <Card
                title='司机分布'
                extra={
                    <Button
                        type='primary'
                        onClick={() => {
                            drawPieCity()
                            drawPieAge()
                        }}
                    >
                        刷新
                    </Button>
                }
                className={styled.chart}
            >
                <div className={styled.pieWrap}>
                    <div ref={pieCityRef} className={styled.itemChart} />
                    <div ref={pieAgeRef} className={styled.itemChart} />
                </div>
            </Card>
            <Card
                title='模型诊断'
                extra={
                    <Button type='primary' onClick={drawRadar}>
                        刷新
                    </Button>
                }
                className={styled.chart}
            >
                <div ref={radarRef} className={styled.itemChart} />
            </Card>
        </div>
    )
}
