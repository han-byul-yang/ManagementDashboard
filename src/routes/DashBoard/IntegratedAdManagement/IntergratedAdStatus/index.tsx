import { useMemo } from 'react'

import { IStatusData } from 'types/types'
import { compactNumber } from 'utils/compactNumber'
import { getAdStatusTotals } from 'routes/DashBoard/utils/adClac'
import { chartOptions } from './status'
import StatusItem from '../StatusItem'

import styles from './intergratedAdStatus.module.scss'

interface IIntergratedAdStatus {
  data: IStatusData[]
  pastData: IStatusData[]
}

const IntergratedAdStatus = (props: IIntergratedAdStatus) => {
  const { data, pastData } = props
  const { totalCost, totalImp, totalSales, roas, totalClick, totalConv } = getAdStatusTotals(data)
  const pastTotals = getAdStatusTotals(pastData)

  const sumByContent = chartOptions.map((item) => {
    let value = '0'
    let difference = ''
    switch (item.content) {
      case '광고비':
        value = compactNumber(totalCost)
        difference = compactNumber(totalCost - pastTotals.totalCost)
        break
      case '노출 수':
        value = compactNumber(totalImp)
        difference = compactNumber(totalImp - pastTotals.totalImp)
        break
      case '매출':
        value = compactNumber(totalSales)
        difference = compactNumber(totalSales - pastTotals.totalSales)
        break
      case 'ROAS':
        value = String(Math.round(roas))
        difference = compactNumber(roas - pastTotals.roas)
        break
      case '클릭 수':
        value = compactNumber(totalClick)
        difference = compactNumber(totalClick - pastTotals.totalClick)
        break
      case '전환 수':
        value = compactNumber(totalConv)
        difference = compactNumber(totalConv - pastTotals.totalConv)
        break
    }

    return {
      ...item,
      value,
      difference,
    }
  })

  const StatusList = useMemo(
    () =>
      sumByContent.map((item) => {
        return <StatusItem key={`${item.content}-status`} item={item} />
      }),
    [sumByContent]
  )

  return <ul className={styles.group}>{StatusList}</ul>
}

export default IntergratedAdStatus
