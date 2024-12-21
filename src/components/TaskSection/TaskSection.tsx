import styled from 'styled-components'
import { TasksSectionTitle } from '../TasksSectionTitle'
import { Task } from '../Task/Task'
import { TaskInterface } from '../Board'

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
  tasks: TaskInterface[]
}

const TaskSection: React.FC<TaskSectionProps> = ({ id, title, tasks }) => {
  return (
    <StyledTasksSectionWrapper key={id} id={id}>
      <TasksSectionTitle title={title} tasksNumber={tasks.length} />
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </StyledTasksSectionWrapper>
  )
}

export { TaskSection }
