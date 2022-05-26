import styles from './AdCard/adCard.module.scss'

const CardsSkeleton = () => {
  return (
    <div className={styles.cards}>
      {[1, 2, 3, 4].map((ad) => (
        <div key={ad} className={styles.card}>
          <h4 style={{ display: 'flex' }}>
            <div>_</div>
          </h4>
          <ul>
            <li>
              <div className={styles.itemName}>상태</div>
              <div className={styles.itemContent}>_</div>
            </li>
            <li>
              <div className={styles.itemName}>광고 생성일</div>
              <div className={styles.itemContent}>_</div>
            </li>
            <li>
              <div className={styles.itemName}>일 희망 예산</div>
              <div className={styles.itemContent}>_</div>
            </li>
            <li>
              <div className={styles.itemName}>광고 수익률</div>
              <div className={styles.itemContent}>_</div>
            </li>
            <li>
              <div className={styles.itemName}>매출</div>
              <div className={styles.itemContent}>_</div>
            </li>
            <li>
              <div className={styles.itemName}>광고 비용</div>
              <div className={styles.itemContent}>_</div>
            </li>
          </ul>
          <button type='button' className={styles.editBtn}>
            수정하기
          </button>
        </div>
      ))}
    </div>
  )
}

export default CardsSkeleton
