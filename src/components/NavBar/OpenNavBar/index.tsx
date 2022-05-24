import { NavLink } from 'react-router-dom'
import cx from 'classnames'

import { DashboardIcon, LightIcon, LogoIcon, ManagementIcon } from 'assets/svgs'

import styles from './openNavBar.module.scss'

const OpenNavBar = () => {
  return (
    <>
      <div className={cx(styles.logo)}>
        <LogoIcon />
      </div>
      <div className={styles.service}>
        <div>서비스</div>
        <div>매드업</div>
      </div>
      <div className={styles.nav}>
        <div>광고 센터</div>
        <NavLink to='/' className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <DashboardIcon />
          <span>대시보드</span>
        </NavLink>
        <NavLink to='management' className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <ManagementIcon />
          <span>광고관리</span>
        </NavLink>
      </div>
      <div className={styles.footer}>
        <div className={styles.guide}>
          <div className={styles.lightIcon}>
            <LightIcon />
          </div>
          <div className={styles.guideText}>
            <div>레버 이용 가이드</div>
            <div>시작하기 전에 알아보기</div>
          </div>
        </div>
        <div className={styles.terms}>
          <p>레버는함께만들어갑니다</p>
          <a href='javascript;:'>이용약관</a>
        </div>
      </div>
    </>
  )
}
export default OpenNavBar
