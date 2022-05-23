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
