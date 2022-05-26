export const compactNumber = (number: number): string => {
  return new Intl.NumberFormat('ko', {
    notation: 'compact',
  }).format(number)
}
