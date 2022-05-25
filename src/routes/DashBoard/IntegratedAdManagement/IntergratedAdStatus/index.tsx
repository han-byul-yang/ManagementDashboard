import { useMemo } from 'react'
import { IData } from 'types/types'
import { compactNumber } from 'utils/compactNumber'
import Item from '../Item'

import styles from './intergratedAdStatus.module.scss'
import { chartOptions } from './status'

interface Props {
  data: IData[]
}

const IntergratedAdStatus = (props: Props) => {
  const { data } = props
  // 광고비
  const totalCost = data.map((item) => item.cost).reduce((a, b) => a + b, 0)
  // 노출수
  const totalImp = data.map((item) => item.imp).reduce((a, b) => a + b, 0)
  // 매출
  const totalRevenue = data.map((item) => (item.roas * item.cost) / 100).reduce((a, b) => a + b, 0)
  // ROAS
  const roas = (totalRevenue / totalCost) * 100
  // 클릭수
  const totalClick = data.map((item) => Number(item.click)).reduce((a, b) => a + b, 0)
  // 전환수
  const totalConv = data.map((item) => item.conv).reduce((a, b) => a + b, 0)

  const items = chartOptions.map((item) => {
    let value = '0'
    switch (item.content) {
      case '광고비':
        value = compactNumber(totalCost)
        break
      case '노출 수':
        value = compactNumber(totalImp)
        break
      case '매출':
        value = compactNumber(totalRevenue)
        break
      case 'ROAS':
        value = String(Math.round(roas))
        break
      case '클릭 수':
        value = compactNumber(totalClick)
        break
      case '전환 수':
        value = compactNumber(totalConv)
        break
    }
    return {
      ...item,
      value,
    }
  })
  const Status = useMemo(() => items.map((item) => <Item key={`chart-${item.content}`} item={item} />), [items])
  return <ul className={styles.group}>{Status}</ul>
}

export default IntergratedAdStatus
