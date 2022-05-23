import { mediaDataByDate } from './mediaDataByDate'

export const sumMediaCategory = (startDate: string, endDate: string) => {
  const selectedMediaData = mediaDataByDate(startDate, endDate)

  const sumMediaValueData: Record<string, { value: number; category: string }[]> = {
    google: [],
    facebook: [],
    naver: [],
    kakao: [],
  }

  const sumCategoryData = (media: string) => {
    const cost = selectedMediaData[media].reduce((acc, cur) => {
      return cur.cost + acc
    }, 0)
    const roas = selectedMediaData[media].reduce((acc, cur) => {
      return cur.roas + acc
    }, 0)
    const imp = selectedMediaData[media].reduce((acc, cur) => {
      return cur.imp + acc
    }, 0)
    const ctr = selectedMediaData[media].reduce((acc, cur) => {
      return cur.ctr + acc
    }, 0)
    const cvr = selectedMediaData[media].reduce((acc, cur) => {
      return cur.cvr + acc
    }, 0)

    return [
      { value: cost, category: '광고비' },
      { value: roas, category: '매출' },
      { value: imp, category: '노출 수' },
      { value: ctr, category: '클릭 수' },
      { value: cvr, category: '전환 수' },
    ]
  }

  sumMediaValueData.google = sumCategoryData('google')
  sumMediaValueData.facebook = sumCategoryData('facebook')
  sumMediaValueData.naver = sumCategoryData('naver')
  sumMediaValueData.kakao = sumCategoryData('kakao')
}
