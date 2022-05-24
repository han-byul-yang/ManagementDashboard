const thousand = 1000
const million = thousand * thousand

export const numberFormatter = (value: number): string => {
  const { format } = new Intl.NumberFormat('ko-KR')
  if (value < 10000) {
    return format(value)
  }

  let divisor = 100 * million
  let unit = '억'
  if (value >= 10000 && value < 100 * million) {
    divisor = 10000
    unit = '만'
  }

  let newValue = Number((value / divisor).toFixed(1))
  if (newValue >= 100) {
    newValue = Number(newValue.toFixed(0))
  }

  return `${format(newValue)}${unit}`
}
