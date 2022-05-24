import styles from './DashBoard.module.scss'
import IntegratedAdManagement from './IntegratedAdManagement'
import MediaStatusBoard from './MediaStatusBoard'

const DashBoard = () => {
  return (
    <div className={styles.container}>
      <IntegratedAdManagement />
      <MediaStatusBoard />
    </div>
  )
}

export default DashBoard
