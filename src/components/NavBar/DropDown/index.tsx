import { ArrowDownIcon } from 'assets/svgs'
import { useState } from 'react'
import styles from './dropDown.module.scss'

const DropDown = () => {
  const [inputValue, setInputValue] = useState('매드업')
  const handleDropDownClick = () => {
    console.log('아래로')
  }
  return (
    <div className={styles.dropDown}>
      <input type='text' value={inputValue} disabled />
      <button type='button' onClick={handleDropDownClick}>
        <ArrowDownIcon />
      </button>
    </div>
  )
}
export default DropDown
