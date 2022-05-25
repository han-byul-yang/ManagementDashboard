import { useState } from 'react'
import styles from './dashBoard.module.scss'
import IntegratedAdManagement from './IntegratedAdManagement'
import SelectDate from './IntegratedAdManagement/SelectDate'
import MediaStatusBoard from './MediaStatusBoard'

const DashBoard = () => {
  const [pickStartDate, setPickStartDate] = useState(new Date('2022-03-01'))
  const [pickEndDate, setPickEndDate] = useState(new Date('2022-03-11'))
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h2>대시보드</h2>
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
