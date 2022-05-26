import { ChangeEvent, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { integratedAdData, pickedDate } from 'store/atoms'
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

const IntegratedAdManagement = () => {
  const selectDate = useRecoilValue(pickedDate)
  const [chartData, setChartData] = useRecoilState(integratedAdData)
  const startDate = selectDate.start
  const endDate = selectDate.end
  const [firstChartName, setFirstChartName] = useState('ROAS')
  const [secondChartName, setSecondChartName] = useState('')
  const [statusData, setStatusData] = useState<IStatusData[]>([])
  const [pastStatusData, setPastStatusData] = useState<IStatusData[]>([])
  const [isThirdSelectOpen, setIsThirdSelectOpen] = useState(false)

  const { isLoading } = useQuery<IStatusData[], Error>('trendData', getTrendData, {
    retry: 1,
    // staleTime: 60 * 60 * 1000,
    // cacheTime: 60 * 60 * 1000,
    onSuccess: (res) => {
      setChartData(res)
      setStatusData(
        res.filter(
          (item: IStatusData) =>
            dayjs(startDate).subtract(1, 'day').unix() <= dayjs(item.date).unix() &&
            dayjs(endDate).unix() >= dayjs(item.date).unix() &&
            item
        )
      )

      const dayDifference = dayjs(endDate).diff(dayjs(startDate), 'day')

      setPastStatusData(
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
    setStatusData(
      chartData.filter(
        (item: IStatusData) =>
          dayjs(startDate).subtract(1, 'day').unix() <= dayjs(item.date).unix() &&
          dayjs(endDate).unix() >= dayjs(item.date).unix() &&
          item
      )
    )

    const dayDifference = dayjs(endDate).diff(dayjs(startDate), 'day')

    setPastStatusData(
      chartData.filter(
        (item: IStatusData) =>
          dayjs(startDate)
            .subtract(1 + dayDifference, 'day')
            .unix() <= dayjs(item.date).unix() &&
          dayjs(endDate).subtract(dayDifference, 'day').unix() >= dayjs(item.date).unix() &&
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
        <IntergratedAdStatus data={statusData} pastData={pastStatusData} />

        <div className={styles.selectBtnGroup}>
          <div className={styles.selectBtnBox}>
            <Dropdown options={chartOptions} onChange={handleFirstChartChange} />
            <Dropdown
              options={chartOptions.filter((option) => option.content !== firstChartName)}
              onChange={handleSecondChartChange}
            />
          </div>
          <button type='button' className={styles.filterBtn} onClick={handleThirdBtnClick}>
            <span>주간</span>
          </button>
          <div className={cx(styles.filterBox, { [styles.hidden]: !isThirdSelectOpen })}>
            <button type='button' className={cx(styles.filterBtn, { [styles.daily]: true })}>
              <span>일간</span>
            </button>
          </div>
        </div>

        <IntergratedAdChart data={statusData} firstData={firstChartName} secondData={secondChartName} />
      </div>
    </section>
  )
}

export default IntegratedAdManagement
