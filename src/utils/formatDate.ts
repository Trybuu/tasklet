import { Value } from 'react-calendar/src/shared/types.js'

export const formatDate = (date: Date | Value): string => {
  const day = date instanceof Date && date.getDate()
  const month = date instanceof Date && date.getMonth() + 1
  const year = date instanceof Date && date.getFullYear()

  const fullDate = `${day.toString().padStart(2, '0')}-${month
    .toString()
    .padStart(2, '0')}-${year}`

  return fullDate
}
