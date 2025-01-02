import { useState } from 'react'
import Calendar from 'react-calendar'
import { Value } from 'react-calendar/src/shared/types.js'
import './MainCalendar.css'

export const MainCalendar: React.FC = () => {
  const [value, setValue] = useState<Value>(new Date())

  const handleOnChange = (newValue: Value) => {
    console.log(newValue)
    setValue(newValue)
  }

  return (
    <Calendar
      onChange={handleOnChange}
      value={value}
      maxDetail="month"
      minDetail="year"
    />
  )
}
