import { mediaDataByDate } from './mediaDataByDate'

export const sumMediaCategory = (startDate: string, endDate: string) => {
  const selectedMediaData = mediaDataByDate(startDate, endDate)
  const { google, facebook, naver, kakao } = selectedMediaData
  const selectedAllData = [...google, ...facebook, ...naver, ...kakao]

  let allCost: number = 0
  let allRoas: number = 0
  let allImp: number = 0
  let allCtr: number = 0
  let allCvr: number = 0

  const sumMediaValueData: Record<string, { value: number; category: string }[]> = {
    google: [],
    facebook: [],
    naver: [],
    kakao: [],
  }

  selectedAllData.forEach((media) => {
    allCost += media.cost
    allRoas += media.roas
    allImp += media.imp
    allCtr += media.ctr
    allCvr += media.cvr
  })

  const sumMediaCategoryData = (media: string) => {
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
      { value: (cost / allCost) * 100, category: '광고비' },
      { value: (roas / allRoas) * 100, category: '매출' },
      { value: (imp / allImp) * 100, category: '노출 수' },
      { value: (ctr / allCtr) * 100, category: '클릭 수' },
      { value: (cvr / allCvr) * 100, category: '전환 수' },
    ]
  }

  sumMediaValueData.google = sumMediaCategoryData('google')
  sumMediaValueData.facebook = sumMediaCategoryData('facebook')
  sumMediaValueData.naver = sumMediaCategoryData('naver')
  sumMediaValueData.kakao = sumMediaCategoryData('kakao')
  return sumMediaValueData
}
