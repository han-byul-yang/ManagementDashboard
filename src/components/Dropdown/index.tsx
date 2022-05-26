import { ChangeEventHandler } from 'react'

import { DownIcon } from 'assets/svgs'

import styles from './dropdown.module.scss'

interface IOption {
  value: string
  content: string
}

interface IDropdown {
  options: IOption[]
  onChange?: ChangeEventHandler<HTMLSelectElement>
}

const Dropdown = ({ options, onChange }: IDropdown) => {
  return (
    <div className={styles.options}>
      <select onChange={onChange}>
        {options.map(({ value, content }) => (
          <option key={`${value}-${content}`} value={value}>
            {content}
          </option>
        ))}
      </select>
      <DownIcon />
    </div>
  )
}

export default Dropdown
