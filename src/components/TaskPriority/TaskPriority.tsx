import styled from 'styled-components'
import { MdOutlineWatchLater } from 'react-icons/md'

const StyledTaskPriority = styled.div<{ $priority: string }>`
  align-self: flex-end;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 7rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ $priority, theme }) =>
    ($priority === 'niski' && theme.colors.blue) ||
    ($priority === 'normalny' && theme.colors.orange) ||
    ($priority === 'wysoki' && theme.colors.red)};
  border-radius: 0.5rem;
`

interface TaskPriorityProps {
  priority: 'niski' | 'normalny' | 'wysoki'
}

const TaskPriority: React.FC<TaskPriorityProps> = ({ priority }) => {
  return (
    <StyledTaskPriority $priority={priority}>
      <MdOutlineWatchLater />
      {priority}
    </StyledTaskPriority>
  )
}

export { TaskPriority }
