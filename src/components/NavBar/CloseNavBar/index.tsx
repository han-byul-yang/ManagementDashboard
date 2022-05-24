import { Dispatch, SetStateAction } from 'react'

import { HamburgerIcon, Logo90Icon } from 'assets/svgs'

import styles from './closeNavBar.module.scss'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CloseNavBar = (props: Props) => {
  const { setIsOpen } = props
  return (
    <>
      <button type='button' className={styles.btn} onClick={() => setIsOpen(true)}>
        <HamburgerIcon />
      </button>
      <div className={styles.logo90}>
        <Logo90Icon />
      </div>
    </>
  )
}
export default CloseNavBar
