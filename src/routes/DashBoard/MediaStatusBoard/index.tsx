import axios from 'axios'
import { useEffect, useState } from 'react'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTheme } from 'victory'
import CHART_STYLE from './chartStyle' // CHART_STYLE 이름 설정

import styles from './media.module.scss'

// types에 넣어주기
export interface IMediaChannelData {
  channel: string
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

const MediaStatusBoard = () => {
  return <div>MediaStatusBoard</div>
}

export default MediaStatusBoard

// {
//   "channel": "google",
//   "date": "2022-02-01",
//   "imp": 50, // 노출
//   "click": 7, // 클릭
//   "cost": 2098, // 광고비
//   "convValue": 0, // 전환비용?
//   "ctr": 14.0000, // 클릭률
//   "cvr": 0.0000, // 전환률
//   "cpc": 299.7143, // click per click
//   "cpa": 0.0000, // click per action
//   "roas": 0.0000 // 광고 지출 대비 수익률
// },

// convValue / cost * 100 = roas
// ['cost', 'const x roas', 'imp', 'click', 'imp * cvr']
