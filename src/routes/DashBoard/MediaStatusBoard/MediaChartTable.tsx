import { IMediaChannelData } from 'types/types'
import { sumDataByCategory } from 'routes/DashBoard/MediaStatusBoard/utils/sumDataByCategory'
import { useRecoilValue } from 'recoil'

import { pickedDate } from 'store/atoms'

import styles from './mediaStatusBoard.module.scss'

interface IMediaChartTable {
  mediaDataList: IMediaChannelData[] | undefined
}

const MediaChartTable = ({ mediaDataList }: IMediaChartTable) => {
  const selectDate = useRecoilValue(pickedDate)

  const { google, facebook, naver, kakao, all } = sumDataByCategory(selectDate, mediaDataList)

  const filterCategry = (media: { value: number; category: string }[]) => {
    return [
      media.find((data) => data.category === '광고비'),
      media.find((data) => data.category === '매출'),
      media.find((data) => data.category === 'ROAS'),
      media.find((data) => data.category === '노출 수'),
      media.find((data) => data.category === '클릭 수'),
      media.find((data) => data.category === '클릭률(CTR)'),
      media.find((data) => data.category === '클릭당비용(CPC)'),
    ]
  }

  const filteredmediaData = {
    googleData: [...filterCategry(google)],
    facebookData: [...filterCategry(facebook)],
    naverData: [...filterCategry(naver)],
    kakaoData: [...filterCategry(kakao)],
    allData: [...filterCategry(all)],
  }

  const { googleData, facebookData, naverData, kakaoData, allData } = filteredmediaData

  const mediaDataForTable = [
    { value: kakaoData, name: '카카오' },
    { value: naverData, name: '네이버' },
    { value: facebookData, name: '페이스북' },
    { value: googleData, name: '구글' },
  ]

  const tableHeadList = ['광고비', '매출', 'ROAS', '노출 수', '클릭 수', '클릭률(CTR)', '클릭당 비용(CPC)']

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableRow}>
          <td />
          {tableHeadList.map((column) => (
            <th className={styles.tableHead} key={column}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {mediaDataForTable.map((media, index) => {
          return (
            <tr key={`media-${index}`} className={styles.tableRow}>
              <th className={styles.tableColumn}>{media.name}</th>
              {media.value.map((data, i) => (
                <td className={styles.tableColumn} key={data!.category}>
                  {((data!.value * allData[i]!.value) / 100).toFixed(2)}
                </td>
              ))}
            </tr>
          )
        })}
        <tr className={styles.tableRow}>
          <th className={styles.tableTotal}>총계</th>
          {allData.map((data) => (
            <td className={styles.tableTotal} key={data!.category}>
              {data?.value.toFixed(2)}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default MediaChartTable
