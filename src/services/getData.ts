import axios from 'axios'

export const getAds = async () => {
  const {
    data: { ads },
  } = await axios.get('data/adListData.json')

  return ads
}
