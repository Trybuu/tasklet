import styled from 'styled-components'
import { TaskSection } from '../TaskSection/TaskSection'
import { Action, Todos } from '../../App'

const StyledTasks = styled.section`
  /* grid-row: 4/13; */
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  overflow-x: auto;
`

export interface SectionInterface {
  id: string
  title: string
  status: string
}

const sections: SectionInterface[] = [
  {
    id: 'section-tasks-planned',
    title: 'Zaplanowane',
    status: 'planned',
  },
  {
    id: 'section-tasks-in-progress',
    title: 'W trakcie',
    status: 'in-progress',
  },
  {
    id: 'section-tasks-completed',
    title: 'Wykonane',
    status: 'completed',
  },
]

interface TasksProps {
  tasks: Todos | undefined
  dispatch: React.Dispatch<Action>
}

const Tasks: React.FC<TasksProps> = ({ tasks, dispatch }) => {
  if (!tasks) {
    return <p>Brak zadań</p>
  }

  if (tasks.length >= 0) {
    return (
      <StyledTasks>
        {sections.map((section) => (
          <TaskSection
            key={section.id}
            id={section.id}
            title={section.title}
            status={section.status}
            tasks={tasks.filter((task) => task?.status === section.status)}
            dispatch={dispatch}
          />
        ))}
      </StyledTasks>
    )
  }
}

export { Tasks }
