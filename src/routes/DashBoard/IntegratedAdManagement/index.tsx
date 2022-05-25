import { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import cx from 'classnames'
import dayjs from 'dayjs'

import Item from './Item'
import { IData } from 'types/types'
import IntergratedAdChart from './IntergratedAdChart'
import { compactNumber } from 'utils/compactNumber'
import Dropdown from 'components/Dropdown'

import styles from './integratedAdManagement.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  pickStartDate: Date
  pickEndDate: Date
}

const IntegratedAdManagement = (props: Props) => {
  const chartOptions = [
    {
      value: 'roas',
      content: 'ROAS',
      unit: '%',
    },
    {
      value: 'cost',
      content: '광고비',
      unit: '원',
    },
    {
      value: 'cpc',
      content: '노출 수',
      unit: '회',
    },
    {
      value: 'click',
      content: '클릭 수',
      unit: '회',
    },
    {
      value: 'conv',
      content: '전환 수',
      unit: '회',
    },
    {
      value: 'convValue',
      content: '매출',
      unit: '원',
    },
  ]

  const { pickStartDate, pickEndDate } = props
  const [firstChartName, setFirstChartName] = useState(chartOptions[0].value)
  const [secondChartName, setSecondChartName] = useState(chartOptions[1].value)
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

  const convValueArray = data.map((item) => {
    return item.convValue
  })
  const totalConvValue = convValueArray.reduce((a, b) => a + b, 0)
  const costArray = data.map((item) => {
    return item.cost
  })
  // 광고비 : totalCost
  const totalCost = costArray.reduce((a, b) => a + b, 0)
  // ROAS
  const roas = (totalConvValue / totalCost) * 100

  // 노출수
  const impArray = data.map((item) => {
    return item.imp
  })
  const totalImp = impArray.reduce((a, b) => a + b, 0)

  // 클릭수
  const clickArray = data.map((item) => {
    return item.click
  })
  const totalClick = clickArray.reduce((a, b) => a + b, 0)

  // 전환 수 : totalClick x totalCvr
  const cvrArray = data.map((item) => {
    return item.cvr
  })
  const totalCvr = cvrArray.reduce((a, b) => a + b, 0)
  const conversion = totalClick * totalCvr

  const items = chartOptions.map((item) => {
    let value = '0'
    switch (item.content) {
      case 'ROAS':
        value = String(Math.round(roas))
        break
      case '광고비':
        value = compactNumber(totalCost)
        break
      case '노출 수':
        value = compactNumber(totalImp)
        break
      case '클릭수':
        value = compactNumber(totalClick)
        break
      case '전환 수':
        value = compactNumber(conversion)
        break
      case '매출':
        value = compactNumber(totalConvValue)
        break
    }
    return {
      ...item,
      value,
    }
  })

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
        <ul className={styles.group}>
          {items.map((item) => {
            return <Item key={`chart-${item.value}`} item={item} />
          })}
        </ul>

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
