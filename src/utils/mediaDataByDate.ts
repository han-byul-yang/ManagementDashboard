import dayjs from 'dayjs'

import mediaChannelData from '../routes/DashBoard/MediaStatusBoard/mediaChannelData.json'
// eslint-disable-next-line import/extensions
import { IMediaChannelData } from '../types/types'

export const mediaDataByDate = (startDate: string, endDate: string) => {
  /* useEffect(() => {
    axios.get('/data/mediaChannelData.json').then((response) => response.data)
    console.log(data)
  }) */
  const start = dayjs(startDate)
  const end = dayjs(endDate)

  const selectedMediaData: Record<string, IMediaChannelData[]> = {
    google: [],
    facebook: [],
    naver: [],
    kakao: [],
  }

  mediaChannelData.forEach((mediaData) => {
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
