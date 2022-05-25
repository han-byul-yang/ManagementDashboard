import dayjs from 'dayjs'
import { IMediaChannelData } from 'types/types.d'

export const mediaDataByDate = (startDate: string, endDate: string, mediaDataList: IMediaChannelData[] | undefined) => {
  const start = dayjs(startDate)
  const end = dayjs(endDate)

  const selectedMediaData: Record<string, IMediaChannelData[]> = {
    google: [],
    facebook: [],
    naver: [],
    kakao: [],
  }

  mediaDataList?.forEach((mediaData) => {
    if (dayjs(mediaData.date).unix() < start.unix() || dayjs(mediaData.date).unix() > end.unix()) return
    if (mediaData.channel === 'google') {
      selectedMediaData.google.push(mediaData)
    }
    if (mediaData.channel === 'facebook') {
      selectedMediaData.facebook.push(mediaData)
    }
    if (mediaData.channel === 'naver') {
      selectedMediaData.naver.push(mediaData)
    }
    if (mediaData.channel === 'kakao') {
      selectedMediaData.kakao.push(mediaData)
    }
  })
  return selectedMediaData
}
