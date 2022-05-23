import { useState, ChangeEvent, SetStateAction, Dispatch } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useQuery } from 'react-query'

import { adListState } from 'store/atoms'
import { getAds } from 'services/getData'
import { IAdCard } from 'types/ad'
import AdCard from './AdCard'
import { DownIcon } from 'assets/svgs'

import styles from './Management.module.scss'
import SkeletonUICards from './CardsSkeleton'

const AdsTop = ({ setFilter }: { setFilter: Dispatch<SetStateAction<string>> }) => {
  const setAdList = useSetRecoilState<IAdCard[]>(adListState)

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value)
  }

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

  return (
    <div className={styles.top}>
      <div className={styles.options}>
        <select onChange={handleSelectChange}>
          <option value='all'>전체 광고</option>
          <option value='active'>진행중인 광고</option>
          <option value='ended'>중단된 광고</option>
        </select>
        <DownIcon />
      </div>
      <button type='button' onClick={handleAddBtnClick} className={styles.addBtn}>
        광고 만들기
      </button>
    </div>
  )
}

const AdCards = ({ filter }: { filter: string }) => {
  const adList = useRecoilValue<IAdCard[]>(adListState)

  return (
    <div className={styles.cards}>
      {adList
        .filter((ad) => (filter !== 'all' ? ad.status === filter : ad))
        .map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
    </div>
  )
}

const Management = () => {
  const [filter, setFilter] = useState('all')
  const setAdList = useSetRecoilState<IAdCard[]>(adListState)
  const { isLoading } = useQuery<IAdCard[], Error>('ads', getAds, {
    retry: 1,
    staleTime: 60 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    onSuccess: async (res) => {
      setAdList(res)
    },
  })

  if (isLoading) {
    return (
      <div className={styles.container}>
        <AdsTop setFilter={setFilter} />
        <SkeletonUICards />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <AdsTop setFilter={setFilter} />
      <AdCards filter={filter} />
    </div>
  )
}

export default Management
