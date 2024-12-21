import styled from 'styled-components'
import { TaskInterface } from '../Board'

const StyledTask = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.lightGray};
`

interface TaskProps {
  task: TaskInterface
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <StyledTask draggable>
      <div>{task.icon}</div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.priority}</p>
    </StyledTask>
  )
}

export { Task }
