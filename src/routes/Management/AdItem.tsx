import { useRecoilState } from 'recoil'
import cx from 'classnames'
import dayjs from 'dayjs'

import { adListState } from 'store/atoms'
import { processBudget } from './utils'
import { IAdCard } from 'types/ad'
import EditableBox from './EditableBox'
import { EditIcon } from 'assets/svgs'

import styles from './Management.module.scss'

const AdItem = ({ ad }: { ad: IAdCard }) => {
  const [adList, setAdList] = useRecoilState<IAdCard[]>(adListState)
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

  // 어떤 요소까지 수정이 가능한지 주어진 데이터만으로는 알기 어려워 임의적으로 제목과 예산만 수정 가능한 요소라고 판단
  const handleEditBtnClick = (targetId: number) => {
    setAdList(adList.map((item: IAdCard) => (targetId === item.id ? { ...item, isEditting: !ad.isEditting } : item)))
  }

  const handleToggleStatus = (targetIsEditting: boolean, targetId: number) => {
    if (!targetIsEditting) return

    setAdList(
      adList.map((item: IAdCard) => {
        if (targetId !== item.id) return item

        if (item.status === 'active') {
          return { ...item, status: 'ended', endDate: String(new Date()) }
        }

        if (item.status === 'ended') {
          return { ...item, status: 'active', endDate: '' }
        }

        return item
      })
    )
  }

  return (
    <div className={cx(styles.card, isEditting && styles.isEditting)}>
      <h4>
        <EditableBox defaultText={`${adType === 'web' ? '웹광고' : '앱광고'}_${title}`} isEditting={isEditting} />
      </h4>
      <ul>
        <li>
          <div>상태</div>
          <div role='button' tabIndex={0} onClick={() => handleToggleStatus(isEditting, id)}>
            {isEditting && <EditIcon />}
            {status === 'active' ? '진행중' : '종료'}
          </div>
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
          <div>
            <EditableBox defaultText={`${processBudget(budget)}`} isEditting={isEditting} />
          </div>
        </li>
        <li>
          <div>광고 수익률</div>
          <div>{roas.toLocaleString()}%</div>
        </li>
        <li>
          <div>매출</div>
          <div>{processedConvValue}</div>
        </li>
        <li>
          <div>광고 비용</div>
          <div>{processedCost}</div>
        </li>
      </ul>
      <button type='button' onClick={() => handleEditBtnClick(id)} className={styles.editBtn}>
        {isEditting ? '저장하기' : '수정하기'}
      </button>
    </div>
  )
}

export default AdItem
