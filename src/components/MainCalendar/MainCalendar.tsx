import { useState } from 'react'
import Calendar from 'react-calendar'
import { Value, View } from 'react-calendar/src/shared/types.js'
import './MainCalendar.css'
import styled from 'styled-components'
import { Action } from '../../App'

const StyledCalendar = styled(Calendar)`
  margin-top: auto;
`

interface MainCalendarProps {
  dispatch: React.Dispatch<Action>
  tasksByDate: Record<string, number> | null
}

export const MainCalendar: React.FC<MainCalendarProps> = ({
  dispatch,
  tasksByDate,
}) => {
  const [value, setValue] = useState<Value>(new Date())

  const handleOnChange = (newValue: Value) => {
    setValue(newValue)
    dispatch({ type: 'select_date', payload: newValue })
  }

  if (!tasksByDate) return

  const showTasksCount = ({ date, view }: { date: Date; view: View }) => {
    if (view === 'month') {
      const dateString = date.toLocaleDateString('en-CA').split('T')[0]
      const taskCount = tasksByDate[dateString] || 0
      return taskCount > 0 ? (
        <sup className="react-calendar__tasks-number">{taskCount}</sup>
      ) : null
    }

    return null
  }

  return (
    <StyledCalendar
      onChange={handleOnChange}
      value={value}
      maxDetail="month"
      minDetail="year"
      tileContent={showTasksCount}
    />
  )
}
