import { useEffect, useState } from 'react'
import axios from 'axios'
import cx from 'classnames'

import Item from './Item'
import { numberFormatter } from 'utils/numberFormatter'
import { IData } from 'types/types'
import IntergratedAdChart from './IntergratedAdChart'

import styles from './integratedAdManagement.module.scss'

const ITEMS = [
  {
    id: 0,
    title: 'ROAS',
    unit: '%',
  },
  {
    id: 1,
    title: '광고비',
    unit: '원',
  },
  {
    id: 2,
    title: '노출 수',
    unit: '회',
  },
  {
    id: 3,
    title: '클릭수',
    unit: '회',
  },
  {
    id: 4,
    title: '전환 수',
    unit: '회',
  },
  {
    id: 5,
    title: '매출',
    unit: '원',
  },
]

const IntegratedAdManagement = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<IData[]>([])
  const [isFirstSelectOpen, setIsFirstSelectOpen] = useState(false)
  const [isSecondSelectOpen, setIsSecondSelectOpen] = useState(false)
  const [isThirdSelectOpen, setIsThirdSelectOpen] = useState(false)

  function getTrendDataApi() {
    return axios.get('./data/trendData.json')
  }

  useEffect(() => {
    const loadTredData = async () => {
      try {
        setIsLoading(true)
        const res = await getTrendDataApi()
        const newData = res.data.report.daily.filter(
          (item: IData) =>
            (item.date === '2022-03-01' ||
              item.date === '2022-03-02' ||
              item.date === '2022-03-03' ||
              item.date === '2022-03-04') &&
            item
        )
        setData(newData)
        setIsLoading(false)
      } catch (err) {
        setData([])
      }
    }

    loadTredData()
  }, [])

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

  const items = ITEMS.map((item) => {
    let value = '0'
    switch (item.title) {
      case 'ROAS':
        value = String(Math.round(roas))
        break
      case '광고비':
        value = numberFormatter(totalCost)
        break
      case '노출 수':
        value = numberFormatter(totalImp)
        break
      case '클릭수':
        value = numberFormatter(totalClick)
        break
      case '전환 수':
        value = numberFormatter(conversion)
        break
      case '매출':
        value = numberFormatter(totalConvValue)
        break
    }
    return {
      ...item,
      value,
    }
  })

  const handleFirstBtnClick = () => {
    setIsFirstSelectOpen((prev) => !prev)
  }

  const handleSecondBtnClick = () => {
    setIsSecondSelectOpen((prev) => !prev)
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
            return <Item key={`${item.id}`} item={item} />
          })}
        </ul>

        <div className={styles.selectBtnGroup}>
          <div>
            <button type='button' className={styles.selectBtn} onClick={handleFirstBtnClick}>
              <span className={styles.firstCircle} />
              <span className={styles.firstBtnText}>ROAS</span>
              {/* <FaChevronDown /> */}
            </button>

            <button type='button' className={styles.selectBtn} onClick={handleSecondBtnClick}>
              <span className={styles.secondCircle} />
              <span className={styles.secondBtnText}>클릭수</span>
              {/* <FaChevronDown /> */}
            </button>

            <div className={cx(styles.selectBox, { [styles.first]: true, [styles.hidden]: !isFirstSelectOpen })}>
              <ul>
                {ITEMS.map((item) => {
                  return (
                    <li key={`select_first_${item.title}`} className={styles.selectItem}>
                      {item.title}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className={cx(styles.selectBox, { [styles.second]: true, [styles.hidden]: !isSecondSelectOpen })}>
              <ul>
                {ITEMS.map((item) => {
                  return (
                    <li key={`select_second_${item.title}`} className={styles.selectItem}>
                      {item.title}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <button type='button' className={styles.filterBtn} onClick={handleThirdBtnClick}>
            <span>주간</span>
            {/* <FaChevronDown /> */}
          </button>
          <div className={cx(styles.filterBox, { [styles.hidden]: !isThirdSelectOpen })}>
            <button type='button' className={cx(styles.filterBtn, { [styles.daily]: true })}>
              <span>일간</span>
            </button>
          </div>
        </div>

        {data.length !== 0 && <IntergratedAdChart data={data} firstData='click' secondData='roas' />}
      </div>
    </section>
  )
}

export default IntegratedAdManagement
