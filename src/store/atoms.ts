import { atom } from 'recoil'
import { IAdCard } from 'types/ad'

export const adListState = atom<IAdCard[]>({
  key: 'adList',
  default: [],
})
