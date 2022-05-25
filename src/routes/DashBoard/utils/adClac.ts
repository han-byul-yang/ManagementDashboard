import { IData, IMediaChannelData } from 'types/types'

export const getAdStatus = (data: IData[]) => {
  const totalCost = data.reduce((acc, cur) => acc + cur.cost, 0)
  // 노출수
  const totalImp = data.reduce((acc, cur) => acc + cur.imp, 0)
  // 매출
  const totalSales = data.reduce((acc, cur) => acc + (cur.roas * cur.cost) / 100, 0)
  // ROAS
  const roas = (totalSales / totalCost) * 100
  // 클릭수
  const totalClick = data.reduce((acc, cur) => acc + cur.click, 0)
  // 전환수
  const totalConv = data.reduce((acc, cur) => acc + cur.conv, 0)

  return { totalCost, totalImp, totalSales, roas, totalClick, totalConv }
}

export const getMediaStatus = (data: IMediaChannelData[]) => {
  const totalCost = data.reduce((acc, cur) => acc + cur.cost, 0)
  const totalImp = data.reduce((acc, cur) => acc + cur.imp, 0)
  const totalSales = data.reduce((acc, cur) => acc + (cur.roas * cur.cost) / 100, 0)
  const totalRoas = (totalSales / totalCost) * 100
  const totalClick = data.reduce((acc, cur) => acc + cur.click, 0)
  const totalConv = data.reduce((acc, cur) => acc + cur.click * cur.cvr, 0)
  const totalCtr = data.reduce((acc, cur) => acc + cur.click, 0)
  const totalCpc = data.reduce((acc, cur) => acc + cur.click, 0)

  return { totalCost, totalImp, totalSales, totalRoas, totalClick, totalConv, totalCtr, totalCpc }
}
