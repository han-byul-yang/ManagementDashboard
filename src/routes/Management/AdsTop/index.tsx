import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useSetRecoilState } from 'recoil'

import { adListState } from 'store/atoms'
import { IAdCard } from 'types/ad'
import Dropdown from 'components/Dropdown'

import styles from './adsTop.module.scss'

const AdsTop = ({ setFilter }: { setFilter: Dispatch<SetStateAction<string>> }) => {
  const setAdList = useSetRecoilState<IAdCard[]>(adListState)
  const dropdownOptions = [
    { value: 'all', content: '전체 광고' },
    { value: 'active', content: '진행중인 광고' },
    { value: 'ended', content: '중단된 광고' },
  ]

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
      <Dropdown options={dropdownOptions} onChange={handleSelectChange} />
      <button type='button' onClick={handleAddBtnClick} className={styles.addBtn}>
        광고 만들기
      </button>
    </div>
  )
}

export default AdsTop
