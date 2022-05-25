import { useMemo } from 'react'

import { IData } from 'types/types'
import { compactNumber } from 'utils/compactNumber'
import { getAdStatus } from 'routes/DashBoard/utils/adClac'
import StatusItem from '../StatusItem'
import { chartOptions } from './status'

import styles from './intergratedAdStatus.module.scss'

interface Props {
  data: IData[]
  pastData: IData[]
}

const IntergratedAdStatus = (props: Props) => {
  const { data, pastData } = props
  const { totalCost, totalImp, totalSales, roas, totalClick, totalConv } = getAdStatus(data)

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
        value = compactNumber(totalSales)
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

  const StatusList = useMemo(
    () => items.map((item) => <StatusItem key={`${item.content}-status`} item={item} />),
    [items]
  )

  return <ul className={styles.group}>{StatusList}</ul>
}

export default IntergratedAdStatus
