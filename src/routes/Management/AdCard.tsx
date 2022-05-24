import { memo, useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import cx from 'classnames'
import dayjs from 'dayjs'

import { adListState } from 'store/atoms'
import { processBudget } from './utils'
import { IAdCard } from 'types/ad'
import EditableBox from './EditableBox'
import { EditIcon } from 'assets/svgs'

import styles from './management.module.scss'

const AdCard = ({ ad }: { ad: IAdCard }) => {
  const setAdList = useSetRecoilState<IAdCard[]>(adListState)
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
  const processedConvValue = `${Math.round(convValue / 10000).toLocaleString()}만원`
  const processedCost = `${Math.round(cost / 10000).toLocaleString()}만원`
  const processedBudget = processBudget(budget)

  // 어떤 요소까지 수정이 가능한지 주어진 데이터만으로는 알기 어려워 임의적으로 제목과 예산만 수정 가능한 요소라고 판단
  const handleEditBtnClick = useCallback(
    (targetId: number) => {
      setAdList((prev) =>
        prev.map((item: IAdCard) => (targetId === item.id ? { ...item, isEditting: !ad.isEditting } : item))
      )
    },
    [ad.isEditting, setAdList]
  )

  const handleToggleStatus = useCallback(
    (targetIsEditting: boolean, targetId: number) => {
      if (!targetIsEditting) return

      setAdList((prev) =>
        prev.map((item: IAdCard) => {
          if (targetId !== item.id) return item
          if (item.status === 'active') return { ...item, status: 'ended', endDate: String(new Date()) }
          if (item.status === 'ended') return { ...item, status: 'active', endDate: '' }

          return item
        })
      )
    },
    [setAdList]
  )

  const handleToggleAdType = useCallback(
    (targetId: number) => {
      setAdList((prev) =>
        prev.map((item: IAdCard) => {
          if (targetId !== item.id) return item
          if (item.adType === 'web') return { ...item, adType: 'app' }
          if (item.adType === 'app') return { ...item, adType: 'web' }

          return item
        })
      )
    },
    [setAdList]
  )

  return (
    <div className={cx(styles.card, isEditting && styles.isEditting)}>
      {isEditting && (
        <button type='button' onClick={() => handleToggleAdType(id)} className={styles.adTypeBtn}>
          광고 타입 변경
        </button>
      )}
      <h4 style={{ display: 'flex' }}>
        <div>{adType === 'web' ? '웹광고' : '앱광고'}_</div>
        <EditableBox defaultText={title} isEditting={isEditting} />
      </h4>
      <ul>
        <li>
          <div className={styles.itemName}>상태</div>
          <div
            role='button'
            tabIndex={0}
            onClick={() => handleToggleStatus(isEditting, id)}
            className={styles.itemContent}
          >
            {isEditting && <EditIcon />}
            {status === 'active' ? '진행중' : '종료'}
          </div>
        </li>
        <li>
          <div className={styles.itemName}>광고 생성일</div>
          <div className={styles.itemContent}>
            {dayjs(startDate).format('YYYY-MM-DD')}
            {endDate && `(${dayjs(endDate).format('YYYY-MM-DD')})`}
          </div>
        </li>
        <li>
          <div className={styles.itemName}>일 희망 예산</div>
          <div className={styles.itemContent}>
            <EditableBox defaultText={processedBudget} isEditting={isEditting} />
          </div>
        </li>
        <li>
          <div className={styles.itemName}>광고 수익률</div>
          <div className={styles.itemContent}>{roas.toLocaleString()}%</div>
        </li>
        <li>
          <div className={styles.itemName}>매출</div>
          <div className={styles.itemContent}>{processedConvValue}</div>
        </li>
        <li>
          <div className={styles.itemName}>광고 비용</div>
          <div className={styles.itemContent}>{processedCost}</div>
        </li>
      </ul>
      <button type='button' onClick={() => handleEditBtnClick(id)} className={styles.editBtn}>
        {isEditting ? '저장하기' : '수정하기'}
      </button>
    </div>
  )
}

export default memo(AdCard)
