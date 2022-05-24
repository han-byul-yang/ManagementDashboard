import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { useQuery } from 'react-query'

import { adListState } from 'store/atoms'
import { getAds } from 'services/getData'
import { IAdCard } from 'types/ad'
import AdsTop from './AdsTop'

import styles from './management.module.scss'
import SkeletonUICards from './AdCards/CardsSkeleton'
import AdCards from './AdCards'
import PageHeader from 'components/PageHeader'

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
    <>
      <PageHeader title='광고관리' />
      <div className={styles.container}>
        <AdsTop setFilter={setFilter} />
        <AdCards filter={filter} />
      </div>
    </>
  )
}

export default Management
