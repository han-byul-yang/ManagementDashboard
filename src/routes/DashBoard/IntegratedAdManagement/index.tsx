import { ChangeEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import cx from 'classnames'
import dayjs from 'dayjs'

import { getTrendData } from 'services/getData'
import { IStatusData } from 'types/types'
import IntergratedAdChart from './IntergratedAdChart'
import IntergratedAdStatus from './IntergratedAdStatus'
import { chartOptions } from './IntergratedAdStatus/status'
import Dropdown from 'components/Dropdown'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './integratedAdManagement.module.scss'

interface Props {
  startDate: Date
  endDate: Date
}

const IntegratedAdManagement = (props: Props) => {
  const { startDate, endDate } = props
  const [firstChartName, setFirstChartName] = useState('roas')
  const [secondChartName, setSecondChartName] = useState('cost')
  const [data, setData] = useState<IStatusData[]>([])
  const [pastData, setPastData] = useState<IStatusData[]>([])
  const [isThirdSelectOpen, setIsThirdSelectOpen] = useState(false)

  const { isLoading } = useQuery<IStatusData[], Error>('trendData', getTrendData, {
    retry: 1,
    // staleTime: 60 * 60 * 1000,
    // cacheTime: 60 * 60 * 1000,
    onSuccess: (res) => {
      setData(
        res.filter(
          (item: IStatusData) =>
            dayjs(startDate).subtract(1, 'day').unix() <= dayjs(item.date).unix() &&
            dayjs(endDate).unix() >= dayjs(item.date).unix() &&
            item
        )
      )

      const dayDifference = dayjs(endDate).diff(dayjs(startDate), 'day')

      setPastData(
        res.filter(
          (item: IStatusData) =>
            dayjs(startDate)
              .subtract(1 + dayDifference, 'day')
              .unix() <= dayjs(item.date).unix() &&
            dayjs(endDate).subtract(dayDifference, 'day').unix() >= dayjs(item.date).unix() &&
            item
        )
      )
    },
  })

  useEffect(() => {
    setData((prev) =>
      prev.filter(
        (item: IStatusData) =>
          dayjs(startDate).subtract(1, 'day').unix() <= dayjs(item.date).unix() &&
          dayjs(endDate).unix() >= dayjs(item.date).unix() &&
          item
      )
    )
  }, [endDate, startDate])

  if (isLoading) {
    return <div className={styles.container}>...loading</div>
  }

  const handleFirstChartChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFirstChartName(e.target.value)
  }

  const handleSecondChartChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSecondChartName(e.target.value)
  }

  const handleThirdBtnClick = () => {
    setIsThirdSelectOpen((prev) => !prev)
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>통합 광고 현황</h2>

      <div className={styles.wrapper}>
        <IntergratedAdStatus data={data} pastData={pastData} />

        <div className={styles.selectBtnGroup}>
          <Dropdown options={chartOptions} onChange={handleFirstChartChange} />
          <Dropdown
            options={chartOptions.filter((option) => option.value !== firstChartName)}
            onChange={handleSecondChartChange}
          />
          <button type='button' className={styles.filterBtn} onClick={handleThirdBtnClick}>
            <span>주간</span>
          </button>
          <div className={cx(styles.filterBox, { [styles.hidden]: !isThirdSelectOpen })}>
            <button type='button' className={cx(styles.filterBtn, { [styles.daily]: true })}>
              <span>일간</span>
            </button>
          </div>
        </div>

        <IntergratedAdChart data={data} firstData={firstChartName} secondData={secondChartName} />
      </div>
    </section>
  )
}

export default IntegratedAdManagement
