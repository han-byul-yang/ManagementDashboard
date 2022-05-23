import { DashboardIcon, HamburgerIcon, LightIcon, Logo90Icon, LogoIcon, ManagementIcon } from 'assets/svgs'
import styles from './navBar.module.scss'
import cx from 'classnames'
import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const nav = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handelOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (!nav.current || nav.current.contains(event.target as Node)) return
      setIsOpen(!(window.innerWidth < 1050))
    }
    const handleResize = () => setIsOpen(!(window.innerWidth < 1050))
    window.addEventListener('resize', handleResize)
    document.addEventListener('mousedown', handelOutsideClick)
    document.addEventListener('touchstart', handelOutsideClick)
    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousedown', handelOutsideClick)
      document.removeEventListener('touchstart', handelOutsideClick)
    }
  }, [nav])

  const FullNavBar = useMemo(
    () =>
      isOpen ? (
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
      ) : (
        <>
          <button type='button' className={styles.btn} onClick={() => setIsOpen(true)}>
            <HamburgerIcon />
          </button>
          <div className={styles.logo90}>
            <Logo90Icon />
          </div>
        </>
      ),
    [isOpen]
  )

  return (
    <nav className={cx(styles.navBar, { [styles.closeBar]: !isOpen })} ref={nav}>
      {FullNavBar}
    </nav>
  )
}

export default NavBar
