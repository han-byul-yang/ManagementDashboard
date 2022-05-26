import { useState } from 'react'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryLegend, VictoryTooltip } from 'victory'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'

import { pickedDate } from 'store/atoms'
import { sumDataByCategory } from 'routes/DashBoard/MediaStatusBoard/utils/sumDataByCategory'
import { getMedias } from 'services/getData'
import { IMediaChannelData } from 'types/types.d'

import MediaChartTable from './MediaChartTable'
import chartStyle from './chartStyle'
import styles from './mediaStatusBoard.module.scss'

const MediaStatusBoard = () => {
  const [mediaDataList, setMediaDataList] = useState<IMediaChannelData[]>([
    {
      channel: 'google',
      click: 7,
      convValue: 0,
      cost: 2098,
      cpa: 0,
      cpc: 299.7143,
      ctr: 14,
      cvr: 0,
      date: '2022-02-01',
      imp: 50,
      roas: 0,
    },
  ])
  const selectDate = useRecoilValue(pickedDate)

  const { google, facebook, naver, kakao } = sumDataByCategory(selectDate, mediaDataList)
  const { isLoading } = useQuery('medias', getMedias, {
    onSuccess: (res) => {
      setMediaDataList(res.data)
    },
  })

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.section} />
      </div>
    )
  }

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
  const chartDataLIst = [googleData, facebookData, naverData, kakaoData]

  const tickFormat = ['광고비', '매출', '노출 수', '클릭 수', '전환 수']

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>매체 현황</h2>
      </div>
      <div className={styles.section}>
        <VictoryChart domain={{ y: [0, 100] }} domainPadding={{ x: 160 }} width={1200} height={600}>
          <VictoryAxis
            tickValues={tickFormat}
            scale={{ x: 'time' }}
            style={{
              axis: { stroke: '#EDEFF1', strokeWidth: 0.5 },
              tickLabels: { fontSize: 12, padding: 10, fill: '#94A2AD', fontWeight: 500 },
              ticks: { size: 0 },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(y) => `${y}%`}
            style={{
              axis: { stroke: 'transparent' },
              ticks: { size: 0 },
              tickLabels: { fontSize: 12, padding: 10, fill: '#94A2AD', fontWeight: 500 },
              grid: { strokeDasharray: 0, stroke: '#EDEFF1', strokeWidth: 0.3 },
            }}
          />
          <VictoryStack colorScale={['#AC8AF8', '#85DA47', '#4FADF7', '#FFEB00']}>
            {chartDataLIst.map((media) => {
              return (
                <VictoryBar
                  key={`media-${media}`}
                  data={media}
                  {...chartStyle.bar}
                  labels={({ datum }) => `${datum.value.toFixed(2)}`}
                  labelComponent={<VictoryTooltip flyoutWidth={80} style={{ fill: '#3a474e' }} />}
                />
              )
            })}
          </VictoryStack>
          <VictoryLegend
            x={700}
            y={590}
            orientation='horizontal'
            gutter={50}
            style={{ title: { fontSize: 20 } }}
            data={[
              { name: '카카오', symbol: { fill: '#FFEB00' }, labels: { fill: '#3a474e' } },
              { name: '페이스북', symbol: { fill: '#4FADF7' }, labels: { fill: '#3a474e' } },
              { name: '네이버', symbol: { fill: '#85DA47' }, labels: { fill: '#3a474e' } },
              { name: '구글', symbol: { fill: '#AC8AF8' }, labels: { fill: '#3a474e' } },
            ]}
          />
        </VictoryChart>
        <div className={styles.tableBox}>
          <MediaChartTable mediaDataList={mediaDataList} />
        </div>
      </div>
    </div>
  )
}

export default MediaStatusBoard
