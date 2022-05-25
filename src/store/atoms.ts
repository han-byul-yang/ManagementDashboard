import { atom } from 'recoil'
import { IAdCard } from 'types/ad'
import { IMediaChannelData } from 'types/types'

export const adListState = atom<IAdCard[]>({
  key: 'adList',
  default: [],
})

export const mediaListState = atom<IMediaChannelData[]>({
  key: 'mediaList',
  default: [],
})
