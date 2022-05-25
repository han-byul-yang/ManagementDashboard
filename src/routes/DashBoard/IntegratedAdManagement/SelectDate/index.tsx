import { Dispatch, SetStateAction } from 'react'
import DatePicker from 'react-datepicker'

import styles from './selectDate.module.scss'

interface Props {
  startDate: Date
  setStartDate: Dispatch<SetStateAction<Date>>
  endDate: Date
  setEndDate: Dispatch<SetStateAction<Date>>
}

const SelectDate = (props: Props) => {
  const { startDate, setStartDate, endDate, setEndDate } = props
  return (
    <div className={styles.selectDate}>
      <DatePicker
        selected={startDate}
        dateFormat='yyyy년 MM월 dd일'
        onChange={(date: Date) => setStartDate(date)}
        customInput={<input type='text' style={{ width: '120px' }} />}
      />
      <div>~</div>
      <DatePicker
        selected={endDate}
        dateFormat='yyyy년 MM월 dd일'
        onChange={(date: Date) => setEndDate(date)}
        customInput={
          // 날짜 뜨는 인풋 커스텀
          <input type='text' style={{ width: '120px', marginLeft: '5px' }} />
        }
      />
    </div>
  )
}

export default SelectDate
