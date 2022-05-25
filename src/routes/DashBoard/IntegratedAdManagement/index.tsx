import { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import cx from 'classnames'
import dayjs from 'dayjs'

import { IData } from 'types/types'
import IntergratedAdChart from './IntergratedAdChart'
import Dropdown from 'components/Dropdown'
import IntergratedAdStatus from './IntergratedAdStatus'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './integratedAdManagement.module.scss'
import { chartOptions } from './IntergratedAdStatus/status'

interface Props {
  pickStartDate: Date
  pickEndDate: Date
}

const IntegratedAdManagement = (props: Props) => {
  const { pickStartDate, pickEndDate } = props
  const [firstChartName, setFirstChartName] = useState('roas')
  const [secondChartName, setSecondChartName] = useState('cost')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<IData[]>([])
  const [isThirdSelectOpen, setIsThirdSelectOpen] = useState(false)

  function getTrendDataApi() {
    return axios.get('./data/trendData.json')
  }

  useEffect(() => {
    const loadTredData = async () => {
      try {
        setIsLoading(true)
        const res = await getTrendDataApi()
        const startDate = dayjs(pickStartDate).subtract(1, 'day')
        const endDate = dayjs(pickEndDate).add(1, 'day')
        const newData = res.data.report.daily.filter(
          (item: IData) => startDate.isBefore(dayjs(item.date)) && endDate.isAfter(dayjs(item.date)) && item
        )
        setData(newData)
        setIsLoading(false)
      } catch (err) {
        setData([])
      }
    }

    loadTredData()
  }, [pickEndDate, pickStartDate])

  if (isLoading) return <div>로딩중...</div>

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
        <IntergratedAdStatus data={data} />

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

        {data.length !== 0 && (
          <IntergratedAdChart data={data} firstData={firstChartName} secondData={secondChartName} />
        )}
      </div>
    </section>
  )
}

export default IntegratedAdManagement
