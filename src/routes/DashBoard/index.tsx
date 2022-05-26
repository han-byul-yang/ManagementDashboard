import IntegratedAdManagement from './IntegratedAdManagement'
import PageHeader from 'components/PageHeader'
import SelectDate from './IntegratedAdManagement/SelectDate'
import MediaStatusBoard from './MediaStatusBoard'

import styles from './dashBoard.module.scss'

const DashBoard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <PageHeader title='대시보드' />
        <SelectDate />
      </div>
      <IntegratedAdManagement />
      <MediaStatusBoard />
    </div>
  )
}

export default DashBoard
