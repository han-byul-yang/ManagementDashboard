import { useState } from 'react'

import IntegratedAdManagement from './IntegratedAdManagement'
import PageHeader from 'components/PageHeader'
import SelectDate from './IntegratedAdManagement/SelectDate'
import MediaStatusBoard from './MediaStatusBoard'

import styles from './dashBoard.module.scss'

const DashBoard = () => {
  // TODO: 합쳐서 관리
  const [startDate, setStartDate] = useState(new Date('2022-03-01'))
  const [endDate, setEndDate] = useState(new Date('2022-03-11'))
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <PageHeader title='대시보드' />
        <SelectDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
      </div>
      <IntegratedAdManagement startDate={startDate} endDate={endDate} />
      <MediaStatusBoard startDate={startDate} endDate={endDate} />
    </div>
  )
}

export default DashBoard
