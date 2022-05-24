import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react'
import cx from 'classnames'

import { EditIcon } from 'assets/svgs'

import styles from './EditableBox.module.scss'

interface IEditableBox {
  defaultText: string
  isEditting: boolean
}

const EditableBox = ({ defaultText, isEditting }: IEditableBox) => {
  const ref = useRef<HTMLDivElement>(null)
  const [text, setText] = useState(defaultText)
  const [editable, setEditable] = useState(false)

  const handleClick = () => {
    setEditable(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditable(!editable)
    }
  }

  const handleClickOutside = (e: any) => {
    if (editable === true && !ref?.current?.contains(e.target)) setEditable(false)
  }

  useEffect(() => {
    // TODO: 이벤트 리스너 제거
    window.addEventListener('click', handleClickOutside, true)
  })

  return (
    <div className={styles.container} ref={ref}>
      {isEditting && editable ? (
        // eslint-disable-next-line jsx-a11y/no-autofocus
        <input type='text' value={text} onChange={handleChange} onKeyDown={handleKeyDown} autoFocus />
      ) : (
        <div className={styles.editBox}>
          {isEditting && <EditIcon />}
          <div role='button' tabIndex={0} onClick={handleClick} className={cx(isEditting && styles.isEditting)}>
            {text}
          </div>
        </div>
      )}
    </div>
  )
}

export default EditableBox
