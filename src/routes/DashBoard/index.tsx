import { useState } from 'react'

import IntegratedAdManagement from './IntegratedAdManagement'
import PageHeader from 'components/PageHeader'
import SelectDate from './IntegratedAdManagement/SelectDate'
import MediaStatusBoard from './MediaStatusBoard'

import styles from './dashBoard.module.scss'

const DashBoard = () => {
  // TODO: 합쳐서 관리
  const [pickStartDate, setPickStartDate] = useState(new Date('2022-03-01'))
  const [pickEndDate, setPickEndDate] = useState(new Date('2022-03-11'))
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <PageHeader title='대시보드' />
        <SelectDate
          pickStartDate={pickStartDate}
          setPickStartDate={setPickStartDate}
          pickEndDate={pickEndDate}
          setPickEndDate={setPickEndDate}
        />
      </div>
      <IntegratedAdManagement pickStartDate={pickStartDate} pickEndDate={pickEndDate} />
      <MediaStatusBoard />
    </div>
  )
}

export default DashBoard
