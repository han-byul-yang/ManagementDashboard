import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTheme, VictoryLegend } from 'victory'

import { sumMediaCategory } from './sumMediaCategory'

import chartStyle from './chartStyle'

const MediaStatusBoard = () => {
  const { google, facebook, naver, kakao } = sumMediaCategory('2022-02-05', '2022-04-01')

  const tickFormat = ['광고비', '매출', '노출 수', '클릭 수', '전환 수']

  return (
    <div>
      <div>
        <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 100 }} width={1100} height={300}>
          <VictoryAxis tickValues={tickFormat} scale={{ x: 'time' }} />
          <VictoryAxis dependentAxis tickFormat={(y) => `${y}%`} />
          <VictoryStack colorScale={['#AC8AF8', '#85DA47', '#4FADF7', '#FFEB00']}>
            <VictoryBar data={google} {...chartStyle.bar} />
            <VictoryBar data={facebook} {...chartStyle.bar} />
            <VictoryBar data={naver} {...chartStyle.bar} />
            <VictoryBar data={kakao} {...chartStyle.bar} cornerRadius={{ top: 6 }} />
          </VictoryStack>
          <VictoryLegend
            x={700}
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
    </div>
  )
}

export default MediaStatusBoard
