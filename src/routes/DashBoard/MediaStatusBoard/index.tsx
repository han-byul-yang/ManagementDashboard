import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTheme, VictoryLegend } from 'victory'

import { sumMediaCategory } from '../../../utils/sumMediaCategory'

import ChartTable from './ChartTable'
import chartStyle from './chartStyle'
import styles from './mediaStatusBoard.module.scss'

const MediaStatusBoard = () => {
  const { google, facebook, naver, kakao } = sumMediaCategory('2022-04-01', '2022-04-20')

  const filterCategry = (media: { value: number; category: string }[]) => {
    return [
      media.find((data) => data.category === '광고비'),
      media.find((data) => data.category === '매출'),
      media.find((data) => data.category === '노출 수'),
      media.find((data) => data.category === '클릭 수'),
      media.find((data) => data.category === '전환 수'),
    ]
  }

  const mediaDataForChart = {
    googleData: [...filterCategry(google)],
    facebookData: [...filterCategry(facebook)],
    naverData: [...filterCategry(naver)],
    kakaoData: [...filterCategry(kakao)],
  }

  const { googleData, facebookData, naverData, kakaoData } = mediaDataForChart
  const tickFormat = ['광고비', '매출', '노출 수', '클릭 수', '전환 수']

  return (
    <div className={styles.container}>
      <div className={styles.title}>매체 현황</div>
      <div className={styles.background}>
        <div className={styles.chartBox}>
          <VictoryChart
            theme={VictoryTheme.material}
            domain={{ y: [0, 100] }}
            domainPadding={{ x: 50 }}
            width={1500}
            height={300}
          >
            <VictoryAxis
              tickValues={tickFormat}
              scale={{ x: 'time' }}
              style={{
                axis: { stroke: 'black', strokeWidth: 0.3 },
                tickLabels: { fill: '#757a79' },
                ticks: { size: 0 },
              }}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(y) => `${y}%`}
              style={{
                grid: { strokeDasharray: 0, stroke: '#cccccc', strokeWidth: 0.3 },
                axis: { stroke: 'transparent' },
                tickLabels: { fill: '#757a79' },
                ticks: { size: 0 },
              }}
            />
            <VictoryStack colorScale={['#AC8AF8', '#85DA47', '#4FADF7', '#FFEB00']}>
              <VictoryBar data={googleData} {...chartStyle.bar} />
              <VictoryBar data={facebookData} {...chartStyle.bar} />
              <VictoryBar data={naverData} {...chartStyle.bar} />
              <VictoryBar data={kakaoData} {...chartStyle.bar} cornerRadius={{ top: 6 }} />
            </VictoryStack>
            <VictoryLegend
              x={1140}
              y={283}
              orientation='horizontal'
              gutter={50}
              style={{ title: { fontSize: 20 } }}
              data={[
                { name: '카카오', symbol: { fill: '#FFEB00' } },
                { name: '페이스북', symbol: { fill: '#4FADF7' } },
                { name: '네이버', symbol: { fill: '#85DA47' } },
                { name: '구글', symbol: { fill: '#AC8AF8' } },
              ]}
            />
          </VictoryChart>
        </div>
        <div className={styles.tableBox}>
          <ChartTable />
        </div>
      </div>
    </div>
  )
}

export default MediaStatusBoard
