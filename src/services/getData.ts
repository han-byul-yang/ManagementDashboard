import axios from 'axios'

const sleep = (delay: number) => {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((res) => setTimeout(res, delay))
}

export const getAds = async () => {
  await sleep(1000)

  const {
    data: { ads },
  } = await axios.get('data/adListData.json')

  return ads
}

export const getMedias = async () => {
  await sleep(1000)

  const data = await axios.get('data/mediaChannelData.json')

  return data
}

export const getTrendData = async () => {
  await sleep(1000)

  const res = await axios.get('data/trendData.json')

  return res.data.report.daily
}
