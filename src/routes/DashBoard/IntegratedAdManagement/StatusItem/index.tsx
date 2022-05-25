// import { AiOutlineCaretDown } from 'react-icons/ai'
import styles from './item.module.scss'

interface IItem {
  value: string
  content: string
  unit: string
}

const Item = ({ item }: { item: IItem }) => {
  return (
    <li key={`item_${item.value}`} className={styles.item}>
      <dl>
        <dt>{item.content}</dt>
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
