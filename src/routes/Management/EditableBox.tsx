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
  const inputRef = useRef<HTMLInputElement>(null)
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
    // TODO:
    // console.log(ref.current, e.target)
    if (editable === !ref?.current?.contains(e.target)) {
      setEditable(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClickOutside, true)
  })

  useEffect(() => {
    inputRef?.current?.focus()
  }, [editable])

  return (
    <div ref={ref} className={styles.container}>
      {isEditting && editable ? (
        <input type='text' value={text} ref={inputRef} onChange={handleChange} onKeyDown={handleKeyDown} />
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
