import styled from 'styled-components'
import { TaskInterface } from '../Board'
import { TaskPriority } from '../TaskPriority'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../../dnd/Constants'

const StyledTask = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  min-height: 16rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.lightGray};
`

const StyledTaskDescription = styled.p`
  font-weight: 300;
`

const StyledTaskIcon = styled.div`
  font-size: 1.25rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
`

interface TaskProps {
  task: TaskInterface
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id: task.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [],
  )

  return (
    <StyledTask
      ref={dragRef}
      style={{ border: isDragging ? '5px solid pink' : 'none' }}
    >
      <StyledTaskIcon>{task.icon}</StyledTaskIcon>
      <h3>{task.title}</h3>
      <StyledTaskDescription>{task.description}</StyledTaskDescription>
      <TaskPriority priority={task.priority} />
    </StyledTask>
  )
}

export { Task }
