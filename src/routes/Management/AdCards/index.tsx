import { useRecoilValue } from 'recoil'

import { adListState } from 'store/atoms'
import { IAdCard } from 'types/ad'
import AdCard from './AdCard'

import styles from './adCards.module.scss'

const AdCards = ({ filter }: { filter: string }) => {
  const adList = useRecoilValue<IAdCard[]>(adListState)

  return (
    <div className={styles.cards}>
      {adList
        .filter((ad) => (filter !== 'all' ? ad.status === filter : ad))
        .map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
    </div>
  )
}

export default AdCards
