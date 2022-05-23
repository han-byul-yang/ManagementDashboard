import { Dispatch, SetStateAction } from 'react'
import cx from 'classnames'
import dayjs from 'dayjs'

import { IAdCard } from 'types/ad'
import EditableBox from './EditableBox'

import styles from './Management.module.scss'

const AdItem = ({
  ad,
  adList,
  setAdList,
}: {
  ad: IAdCard
  adList: IAdCard[]
  setAdList: Dispatch<SetStateAction<IAdCard[]>>
}) => {
  const {
    id,
    adType,
    title,
    budget,
    status,
    startDate,
    endDate,
    report: { cost, convValue, roas },
    isEditting,
  } = ad

  const handleEditBtnClick = (targetId: number) => {
    setAdList(adList.map((item: any) => (targetId === item.id ? { ...item, isEditting: !ad.isEditting } : item)))
  }

  return (
    <div className={cx(styles.card, isEditting && styles.isEditting)}>
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
          <EditableBox defaultText={`${budget}만원`} isEditting={isEditting} />
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
      <button type='button' onClick={() => handleEditBtnClick(id)} className={styles.editBtn}>
        {isEditting ? '저장하기' : '수정하기'}
      </button>
    </div>
  )
}

export default AdItem
