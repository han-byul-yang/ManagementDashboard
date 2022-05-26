import DatePicker from 'react-datepicker'
import { useRecoilState } from 'recoil'
import { pickedDate } from 'store/atoms'

import styles from './selectDate.module.scss'

const SelectDate = () => {
  const [selectDate, setSelectDate] = useRecoilState(pickedDate)
  return (
    <div className={styles.selectDate}>
      <DatePicker
        selected={selectDate.start}
        dateFormat='yyyy년 MM월 dd일'
        onChange={(date: Date) => setSelectDate((prev) => ({ ...prev, start: date }))}
        customInput={<input type='text' style={{ width: '120px' }} />}
      />
      <div>~</div>
      <DatePicker
        selected={selectDate.end}
        dateFormat='yyyy년 MM월 dd일'
        onChange={(date: Date) => setSelectDate((prev) => ({ ...prev, end: date }))}
        customInput={
          // 날짜 뜨는 인풋 커스텀
          <input type='text' style={{ width: '120px', marginLeft: '5px' }} />
        }
      />
    </div>
  )
}

export default SelectDate
