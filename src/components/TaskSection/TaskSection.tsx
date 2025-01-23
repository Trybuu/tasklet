import styled from 'styled-components'
import { TasksSectionTitle } from '../TasksSectionTitle'
import { Task } from '../Task/Task'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../dnd/Constants'
import { Action, Todos } from '../../App'
import { TaskNew } from '../TaskNew'

const StyledTasksSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: calc(100% - 1rem);

  @media screen and (min-width: 1024px) {
    min-width: calc(33.3% - 1rem);
  }
`

interface TaskSectionProps {
  id: string
  title: string
  status: string
  tasks: Todos
  dispatch: React.Dispatch<Action>
}

type DraggedItem = {
  id: string
}

const TaskSection: React.FC<TaskSectionProps> = ({
  id,
  title,
  status,
  tasks,
  dispatch,
}) => {
  const [, dropRef] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: DraggedItem) => addTaskToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const addTaskToSection = (id: string) => {
    dispatch({ type: 'move_task', payload: { id: id, status: status } })
  }

  return (
    <StyledTasksSectionWrapper key={id} id={id} ref={dropRef}>
      <TasksSectionTitle title={title} tasksNumber={tasks.length} />
      {tasks.map((task) => (
        <Task key={task.id} task={task} dispatch={dispatch} />
      ))}
      <TaskNew dispatch={dispatch} status={status} />
    </StyledTasksSectionWrapper>
  )
}

export { TaskSection }
