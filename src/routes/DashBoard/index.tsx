import IntegratedAdManagement from './IntegratedAdManagement'
import PageHeader from 'components/PageHeader'
import SelectDate from './IntegratedAdManagement/SelectDate'
import MediaStatusBoard from './MediaStatusBoard'

import styles from './dashBoard.module.scss'
import { useRecoilValue } from 'recoil'
import { pickedDate } from 'store/atoms'

const DashBoard = () => {
  const selectDate = useRecoilValue(pickedDate)
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <PageHeader title='대시보드' />
        <SelectDate />
      </div>
      <IntegratedAdManagement startDate={selectDate.start} endDate={selectDate.end} />
      <MediaStatusBoard startDate={selectDate.start} endDate={selectDate.end} />
    </div>
  )
}

export default DashBoard
