export const processBudget = (value: number) => {
  const thousands = Math.floor(value / 1000) - Math.floor(value / 10000) * 10
  if (value > 100000 && thousands === 0) return `${Math.floor(value / 10000)}만원`
  if (value > 100000) return `${Math.floor(value / 10000)}만${thousands}천원`
  if (value > 1000) return `${Math.floor(value / 1000)}천원`
  return `${value}원`
}
