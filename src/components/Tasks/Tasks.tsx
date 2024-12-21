import styled from 'styled-components'
import { TasksSectionTitle } from '../TasksSectionTitle'

const StyledTasks = styled.section`
  grid-row: 4/13;
  display: flex;
`

const Tasks: React.FC = () => {
  return (
    <StyledTasks>
      <section id="section-tasks-planned">
        <TasksSectionTitle title="Zaplanowane" tasksNumber={3} />
      </section>
      <section id="section-tasks-in-progress"></section>
      <TasksSectionTitle title="W trakcie" tasksNumber={1} />
      <section id="section-tasks-completed">
        <TasksSectionTitle title="Wykonane" tasksNumber={12} />
      </section>
    </StyledTasks>
  )
}

export { Tasks }
