import { LogoIcon } from 'assets/svgs'
import styles from './NavBar.module.scss'
import cx from 'classnames'
import { useMemo, useState } from 'react'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const FullNavBar = useMemo(
    () =>
      isOpen ? (
        <>
          <div className={cx(styles.logo)}>
            <LogoIcon />
          </div>
          <div className={styles.service}>서비스</div>
          <div className={styles.nav}>광고센터</div>
          <div className={styles.footer}>
            <div className={styles.guide}>레버 이용 가이드</div>
            <div className={styles.terms}>
              <p>레버는함께만들어갑니다</p>
              <a href='#'>이용약관</a>
            </div>
          </div>
        </>
      ) : (
        <div>
          <button type='button' onClick={() => setIsOpen(true)}>
            햄버거
          </button>
        </div>
      ),
    [isOpen]
  )

  return <nav className={cx(styles.navBar, { [styles.closeBar]: !isOpen })}>{FullNavBar}</nav>
}

export default NavBar
