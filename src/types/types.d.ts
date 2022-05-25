interface ICommonAdData {
  date: string
  imp: number
  click: number
  cost: number
  convValue: number
  ctr: number
  cvr: number
  cpc: number
  cpa: number
  roas: number
}

export interface IMediaChannelData extends ICommonAdData {
  channel: string
}

export interface IStatusData extends ICommonAdData {
  conv: number
}
