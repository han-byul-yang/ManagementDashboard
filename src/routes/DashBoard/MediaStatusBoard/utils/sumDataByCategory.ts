import { IMediaChannelData } from 'types/types'
import { mediaDataByDate } from './mediaDataByDate'
import { getMediaStatus } from 'routes/DashBoard/utils/adClac'

interface ISumData {
  totalCost: number
  totalImp: number
  totalSales: number
  totalRoas: number
  totalClick: number
  totalConv: number
  totalCtr: number
  totalCpc: number
}

export const sumDataByCategory = (pickStartDate: Date, pickEndDate: Date, mediaDataList: IMediaChannelData[]) => {
  const selectedDateMediaData = mediaDataByDate(pickStartDate, pickEndDate, mediaDataList)
  const { google, facebook, naver, kakao } = selectedDateMediaData

  const googleData = getMediaStatus(google)
  const facebookData = getMediaStatus(facebook)
  const naverData = getMediaStatus(naver)
  const kakaoData = getMediaStatus(kakao)
  const totalData = getMediaStatus(mediaDataList)

  const sumCategoryData = (media: ISumData) => [
    { value: (media.totalCost / totalData.totalCost) * 100, category: '광고비' },
    { value: (media.totalSales / totalData.totalSales) * 100, category: '매출 수' },
    { value: (media.totalImp / totalData.totalImp) * 100, category: '노출 수' },
    { value: (media.totalClick / totalData.totalClick) * 100, category: '클리 수' },
    { value: (media.totalConv / totalData.totalConv) * 100, category: '전환 수' },
    { value: (media.totalRoas / totalData.totalRoas) * 100, category: 'ROAS' },
    { value: (media.totalCtr / totalData.totalCtr) * 100, category: '클릭률(CTR)' },
    { value: (media.totalCpc / totalData.totalCpc) * 100, category: '클릭당비용(CPC)' },
  ]

  const sumAllMediaData = [
    { value: totalData.totalCost, category: '광고비' },
    { value: totalData.totalSales, category: '매출 수' },
    { value: totalData.totalImp, category: '노출 수' },
    { value: totalData.totalClick, category: '클리 수' },
    { value: totalData.totalConv, category: '전환 수' },
    { value: totalData.totalRoas, category: 'ROAS' },
    { value: totalData.totalCtr, category: '클릭률(CTR)' },
    { value: totalData.totalCpc, category: '클릭당비용(CPC)' },
  ]

  return {
    googleList: sumCategoryData(googleData),
    facebookList: sumCategoryData(facebookData),
    naverList: sumCategoryData(naverData),
    kakaoList: sumCategoryData(kakaoData),
    totalDataList: sumAllMediaData,
  }
}

/*
export const sumDataByCategory = (
  pickStartDate: Date,
  pickEndDate: Date,
  mediaDataList: IMediaChannelData[] | undefined
) => {
  const selectedMediaData = mediaDataByDate(pickStartDate, pickEndDate, mediaDataList)
  const { google, facebook, naver, kakao } = selectedMediaData
  const selectedAllData = [...google, ...facebook, ...naver, ...kakao]

  let allCost: number = 0
  let allSales: number = 0
  let allImp: number = 0
  let allClick: number = 0
  let allConversion: number = 0
  let allRoas: number = 0
  let allCtr: number = 0
  let allCpc: number = 0

  const sumMediaValueData: Record<string, { value: number; category: string }[]> = {
    google: [],
    facebook: [],
    naver: [],
    kakao: [],
    all: [],
  }

  selectedAllData.forEach((media) => {
    allCost += media.cost
    allSales += media.roas * media.cost
    allImp += media.imp
    allClick += media.click
    allConversion += media.click * media.cvr
    allRoas += media.roas
    allCtr += media.ctr
    allCpc += media.cpc
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
    const click = selectedMediaData[media].reduce((acc, cur) => {
      return cur.click + acc
    }, 0)
    const ctr = selectedMediaData[media].reduce((acc, cur) => {
      return cur.ctr + acc
    }, 0)
    const cpc = selectedMediaData[media].reduce((acc, cur) => {
      return cur.cpc + acc
    }, 0)
    const sales = selectedMediaData[media].reduce((acc, cur) => {
      return cur.roas * cur.cost + acc
    }, 0)
    const conversion = selectedMediaData[media].reduce((acc, cur) => {
      return cur.click * cur.cvr + acc
    }, 0)
    return [
      { value: (cost / allCost) * 100, category: '광고비' },
      { value: (sales / allSales) * 100, category: '매출' },
      { value: (imp / allImp) * 100, category: '노출 수' },
      { value: (click / allClick) * 100, category: '클릭 수' },
      { value: (conversion / allConversion) * 100, category: '전환 수' },
      { value: (roas / allRoas) * 100, category: 'ROAS' },
      { value: (ctr / allCtr) * 100, category: '클릭률(CTR)' },
      { value: (cpc / allCpc) * 100, category: '클릭당비용(CPC)' },
    ]
  }

  sumMediaValueData.google = sumMediaCategoryData('google')
  sumMediaValueData.facebook = sumMediaCategoryData('facebook')
  sumMediaValueData.naver = sumMediaCategoryData('naver')
  sumMediaValueData.kakao = sumMediaCategoryData('kakao')

  sumMediaValueData.all = [
    { value: allCost, category: '광고비' },
    { value: allSales, category: '매출' },
    { value: allRoas, category: 'ROAS' },
    { value: allImp, category: '노출 수' },
    { value: allClick, category: '클릭 수' },
    { value: allCtr, category: '클릭률(CTR)' },
    { value: allCpc, category: '클릭당비용(CPC)' },
  ]

  return sumMediaValueData
}
*/
