import dayjs from 'dayjs'

import mediaChannelData from './mediaChannelData.json'
// eslint-disable-next-line import/extensions
import { IMediaChannelData } from '../MediaStatusBoard/types'

export const mediaDataByDate = (startDate: string, endDate: string) => {
  const start = dayjs(startDate)
  const end = dayjs(endDate)

  const selectedMediaData: Record<string, IMediaChannelData[]> = {
    google: [],
    facebook: [],
    naver: [],
    kakao: [],
  }

  mediaChannelData.forEach((mediaData) => {
    if (dayjs(mediaData.date).valueOf() <= start.valueOf() || dayjs(mediaData.date).valueOf() >= end.valueOf()) return
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
