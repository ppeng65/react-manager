import { useEffect, useState, useRef, RefObject } from 'react'
import * as echarts from 'echarts'
import { useStore } from '@/store'

export const useCharts = (): [RefObject<HTMLDivElement>, echarts.EChartsType | undefined] => {
    const isDark = useStore(state => state.isDark)
    const chartRef = useRef<HTMLDivElement>(null)
    const [chartInstance, setChartInstance] = useState<echarts.EChartsType>()
    useEffect(() => {
        const chart = echarts.init(chartRef.current, isDark ? 'dark' : 'light')
        setChartInstance(chart)
        setTimeout(() => {
            chart.resize()
        }, 210)

        return () => {
            chart.dispose()
        }
    }, [isDark])

    return [chartRef, chartInstance]
}
