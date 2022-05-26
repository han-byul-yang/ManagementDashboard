import dayjs from 'dayjs'
import { IMediaChannelData } from 'types/types.d'
import { PickedDate } from 'store/atoms'

export const mediaDataByDate = (selectDate: PickedDate, mediaDataList: IMediaChannelData[] | undefined) => {
  const { start, end } = selectDate
  const startDate = dayjs(start)
  const endDate = dayjs(end)

  const selectedMediaData: Record<string, IMediaChannelData[]> = {
    google: [
      {
        channel: 'google',
        click: 245,
        convValue: 12,
        cost: 265968,
        cpa: 22164,
        cpc: 1085.5837,
        ctr: 0.9778,
        cvr: 4.898,
        date: '2022-03-02',
        imp: 25057,
        roas: 702.7011,
      },
    ],
    facebook: [
      {
        channel: 'facebook',
        click: 245,
        convValue: 12,
        cost: 265968,
        cpa: 22164,
        cpc: 1085.5837,
        ctr: 0.9778,
        cvr: 4.898,
        date: '2022-03-02',
        imp: 25057,
        roas: 702.7011,
      },
    ],
    naver: [
      {
        channel: 'naver',
        click: 245,
        convValue: 12,
        cost: 265968,
        cpa: 22164,
        cpc: 1085.5837,
        ctr: 0.9778,
        cvr: 4.898,
        date: '2022-03-02',
        imp: 25057,
        roas: 702.7011,
      },
    ],
    kakao: [
      {
        channel: 'kakao',
        click: 245,
        convValue: 12,
        cost: 265968,
        cpa: 22164,
        cpc: 1085.5837,
        ctr: 0.9778,
        cvr: 4.898,
        date: '2022-03-02',
        imp: 25057,
        roas: 702.7011,
      },
    ],
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
