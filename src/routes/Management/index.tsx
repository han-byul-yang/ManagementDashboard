import { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import styles from './Management.module.scss'

/* TODO
- 기본 레이아웃
- 카드 편집
- 카드 생성 
*/

interface IAd {
  id: number
  adType: string
  title: string
  budget: number
  status: string
  startDate: string
  endDate: string | null
  report: {
    cost: number
    convValue: number
    roas: number
  }
}

const getAds = async () => {
  const {
    data: { ads },
  } = await axios.get('data/adListData.json')

  return ads
}

const Management = () => {
  const [adList, setAdList] = useState<IAd[]>([])

  useEffect(() => {
    ;(async () => {
      const ads = await getAds()
      setAdList(ads)
    })()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <select className={styles.options}>
          <option value='all'>전체 광고</option>
          <option value='process'>진행중인 광고</option>
          <option value='stop'>중단된 광고</option>
        </select>
        <button type='button' className={styles.addBtn}>
          광고 만들기
        </button>
      </div>
      <div className={styles.cards}>
        {adList?.map((ad) => {
          const {
            id,
            adType,
            title,
            budget,
            status,
            startDate,
            endDate,
            report: { cost, convValue, roas },
          } = ad

          return (
            <div key={id} className={styles.card}>
              <h4>{`${adType === 'web' ? '웹광고' : '앱광고'}_${title}`}</h4>
              <ul>
                <li>
                  <div>상태</div>
                  <div>{status === 'active' ? '진행중' : '종료'}</div>
                </li>
                <li>
                  <div>광고 생성일</div>
                  <div>
                    {dayjs(startDate).format('YYYY-MM-DD')}
                    {endDate && `(${dayjs(endDate).format('YYYY-MM-DD')})`}
                  </div>
                </li>
                <li>
                  <div>일 희망 예산</div>
                  <div>{budget.toLocaleString()}</div>
                </li>
                <li>
                  <div>광고 수익률</div>
                  <div>{roas.toLocaleString()}%</div>
                </li>
                <li>
                  <div>매출</div>
                  <div>{convValue.toLocaleString()}원</div>
                </li>
                <li>
                  <div>광고 비용</div>
                  <div>{cost.toLocaleString()}원</div>
                </li>
              </ul>
              <button type='button' className={styles.editBtn}>
                수정하기
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Management
