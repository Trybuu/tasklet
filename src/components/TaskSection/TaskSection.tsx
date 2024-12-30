import styled from 'styled-components'
import { useState } from 'react'
import { TasksSectionTitle } from '../TasksSectionTitle'
import { Task } from '../Task/Task'
import { TaskInterface } from '../Board'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../dnd/Constants'

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
  const [sectionTasks, setSectionTasks] = useState(tasks)

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => addTaskToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const addTaskToSection = (id: string) => {
    const tasksList = sectionTasks.filter((task) => task.id === id)
    console.log(tasksList)
  }

  return (
    <StyledTasksSectionWrapper key={id} id={id} ref={dropRef}>
      <TasksSectionTitle title={title} tasksNumber={tasks.length} />
      {sectionTasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </StyledTasksSectionWrapper>
  )
}

export { TaskSection }
