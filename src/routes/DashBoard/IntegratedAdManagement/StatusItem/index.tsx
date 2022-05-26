import { DownGreenIcon, UpRedIcon } from 'assets/svgs'
import styles from './statusItem.module.scss'

interface IStatusItem {
  value: string
  content: string
  unit: string
  difference: string
  isPositive: boolean
}

const StatusItem = ({ item }: { item: IStatusItem }) => {
  return (
    <li key={`item_${item.value}`} className={styles.item}>
      <dl>
        <dt>{item.content}</dt>
        <dd>
          {item.value}
          {item.unit}
        </dd>
      </dl>

      <div className={styles.rate}>
        <div className={styles.rateText}>
          {!item.isPositive ? <UpRedIcon /> : <DownGreenIcon />}
          {item.difference}
          {item.unit}
        </div>
      </div>
    </li>
  )
}

export default StatusItem
