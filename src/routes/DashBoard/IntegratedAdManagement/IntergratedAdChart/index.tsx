import { useEffect, useState } from 'react'
import { VictoryChart, VictoryLine, VictoryAxis, VictoryVoronoiContainer } from 'victory'
import dayjs from 'dayjs'

import { compactNumber } from 'utils/compactNumber'
import { IStatusData } from 'types/types'

interface Props {
  data: IStatusData[]
  firstData: string
  secondData: string
}
interface ChartData {
  x: string | number | undefined
  y: string | number | undefined
}

const IntergratedAdChart = (props: Props) => {
  const { data, firstData, secondData } = props
  const [firstChartData, setFirstChartData] = useState<ChartData[]>([{ x: '', y: '' }])
  const [secondChartData, setSecondChartData] = useState<ChartData[]>([{ x: '', y: '' }])
  useEffect(() => {
    if (firstData) {
      const newFirstChartData = data.map((item) => {
        const x = item.date
        let y
        if (
          firstData === 'click' ||
          firstData === 'roas' ||
          firstData === 'conv' ||
          firstData === 'convValue' ||
          firstData === 'cpc' ||
          firstData === 'cost'
        ) {
          y = item[firstData]
        }
        return { x, y }
      })
      const newSecondChardData = data.map((item) => {
        const x = item.date
        let y
        if (
          secondData === 'click' ||
          secondData === 'roas' ||
          secondData === 'conv' ||
          secondData === 'convValue' ||
          secondData === 'cpc' ||
          secondData === 'cost'
        ) {
          y = item[secondData]
        }
        return { x, y }
      })
      setFirstChartData(newFirstChartData)
      setSecondChartData(newSecondChardData)
    }
  }, [data, firstData, secondData])
  return (
    <VictoryChart
      domainPadding={{ x: 50, y: 50 }}
      height={400}
      width={1000}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) => {
            return datum.y
          }}
        />
      }
    >
      <VictoryAxis
        scale={{ x: 'time' }}
        tickFormat={(x) => `${dayjs(x).format('M')}월 ${dayjs(x).format('D')}일`}
        style={{
          axis: { strokeWidth: 0.5, fill: 'black' },
          tickLabels: { fontSize: 12, padding: 10, fill: '#cccccc' },
          ticks: { stroke: 'grey', size: 0 },
        }}
      />
      <VictoryAxis
        dependentAxis
        offsetX={50}
        tickFormat={(value: number) => compactNumber(value)}
        style={{
          axis: { stroke: 'transparent' },
          tickLabels: { fontSize: 12, padding: 10, fill: '#cccccc' },
          ticks: { stroke: '#eeeeee', size: 0 },
          grid: { stroke: '#eeeeee' },
        }}
      />
      <VictoryLine
        style={{
          data: { stroke: '#c43a31' },
        }}
        data={firstChartData}
      />
      <VictoryLine
        style={{
          data: { stroke: '#0B99FF' },
        }}
        data={secondChartData}
      />
    </VictoryChart>
  )
}

export default IntergratedAdChart
