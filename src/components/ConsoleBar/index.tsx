import { AlertIcon, AvatarIcon, SettingIcon } from 'assets/svgs'
import styles from './consoleBar.module.scss'

const ConsoleBar = () => {
  return (
    <div className={styles.consoleBar}>
      <button type='button'>
        <AlertIcon />
      </button>
      <button type='button'>
        <SettingIcon />
      </button>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          <AvatarIcon />
        </div>
        <div>
          <span>원티드</span>님
        </div>
      </div>
    </div>
  )
}

export default ConsoleBar
