import { useState, useEffect, ChangeEvent } from 'react'

import { getAds } from 'services/getData'

import styles from './Management.module.scss'
import AdItem from './AdItem'

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

interface IAdCard extends IAd {
  isEditting: boolean
}

const Management = () => {
  const [adList, setAdList] = useState<IAdCard[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    ;(async () => {
      const ads = await getAds()
      setAdList(ads)
    })()
  }, [])

  const handleAddBtnClick = () => {
    const newAd = {
      id: Math.random(),
      adType: 'web',
      title: '새로운 광고',
      budget: 0,
      status: 'active',
      startDate: String(new Date()),
      endDate: null,
      report: {
        cost: 0,
        convValue: 0,
        roas: 0,
      },
      isEditting: false,
    }
    setAdList((prev) => [...prev, newAd])
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <select className={styles.options} onChange={handleSelectChange}>
          <option value='all'>전체 광고</option>
          <option value='active'>진행중인 광고</option>
          <option value='ended'>중단된 광고</option>
        </select>
        <button type='button' onClick={handleAddBtnClick} className={styles.addBtn}>
          광고 만들기
        </button>
      </div>
      <div className={styles.cards}>
        {adList
          ?.filter((ad) => {
            if (filter === 'active') {
              return ad.status === 'active'
            }
            if (filter === 'ended') {
              return ad.status === 'ended'
            }

            return ad
          })
          .map((ad) => (
            <AdItem key={ad.id} ad={ad} adList={adList} setAdList={setAdList} />
          ))}
      </div>
    </div>
  )
}

export default Management
