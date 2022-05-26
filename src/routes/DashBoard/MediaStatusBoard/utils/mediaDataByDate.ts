import dayjs from 'dayjs'
import { IMediaChannelData } from 'types/types.d'
import { PickedDate } from 'store/atoms'

export const mediaDataByDate = (selectDate: PickedDate, mediaDataList: IMediaChannelData[] | undefined) => {
  const { start, end } = selectDate
  const startDate = dayjs(start)
  const endDate = dayjs(end)

  const selectedMediaData: Record<string, IMediaChannelData[]> = {
    google: [],
    facebook: [],
    naver: [],
    kakao: [],
  }

  mediaDataList?.forEach((mediaData) => {
    if (dayjs(mediaData.date).unix() < startDate.unix() || dayjs(mediaData.date).unix() > endDate.unix()) return
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
