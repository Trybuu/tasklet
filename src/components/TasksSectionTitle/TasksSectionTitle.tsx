import styled from 'styled-components'

const StyledTasksSectionTitle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.primary};
`

const StyledTasksSectionTitleText = styled.h3`
  color: ${({ theme }) => theme.colors.gray400};
`

const StyledTasksNumber = styled.p`
  min-width: 3rem;
  padding: 0.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.gray400};
  border-radius: 0.5rem;
`

interface TasksSectionTitleProps {
  title: string
  tasksNumber: number
}

const TasksSectionTitle: React.FC<TasksSectionTitleProps> = ({
  title,
  tasksNumber,
}) => {
  return (
    <StyledTasksSectionTitle>
      <StyledTasksSectionTitleText>{title}</StyledTasksSectionTitleText>
      <StyledTasksNumber aria-label={`Ilość zadań: ${tasksNumber}`}>
        {tasksNumber}
      </StyledTasksNumber>
    </StyledTasksSectionTitle>
  )
}

export { TasksSectionTitle }
