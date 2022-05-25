import { Dispatch, SetStateAction } from 'react'
import DatePicker from 'react-datepicker'

import styles from './selectDate.module.scss'

interface Props {
  pickStartDate: Date
  setPickStartDate: Dispatch<SetStateAction<Date>>
  pickEndDate: Date
  setPickEndDate: Dispatch<SetStateAction<Date>>
}

const SelectDate = (props: Props) => {
  const { pickStartDate, setPickStartDate, pickEndDate, setPickEndDate } = props
  return (
    <div className={styles.selectDate}>
      <DatePicker
        selected={pickStartDate}
        dateFormat='yyyy년 MM월 dd일'
        onChange={(date: Date) => setPickStartDate(date)}
        customInput={<input type='text' style={{ width: '120px' }} />}
      />
      <div>~</div>
      <DatePicker
        selected={pickEndDate}
        dateFormat='yyyy년 MM월 dd일'
        onChange={(date: Date) => setPickEndDate(date)}
        customInput={
          // 날짜 뜨는 인풋 커스텀
          <input type='text' style={{ width: '120px', marginLeft: '5px' }} />
        }
      />
    </div>
  )
}

export default SelectDate
