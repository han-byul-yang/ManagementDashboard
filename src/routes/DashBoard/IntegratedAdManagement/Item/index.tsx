// import { AiOutlineCaretDown } from 'react-icons/ai'
import styles from './item.module.scss'

interface IItem {
  id: number
  title: string
  unit: string
  value: string
}

interface IProps {
  item: IItem
}

const Item = ({ item }: IProps) => {
  return (
    <li key={`item_${item.id}`} className={styles.item}>
      <dl>
        <dt>{item.title}</dt>
        <dd>
          {item.value} {item.unit}
        </dd>
      </dl>

      <div className={styles.rate}>
        {/* <AiOutlineCaretDown /> */}
        <span className={styles.rateText}>1{item.unit}</span>
      </div>
    </li>
  )
}

export default Item
