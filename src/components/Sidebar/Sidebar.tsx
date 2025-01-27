import styled from 'styled-components'
import { SelectGroup } from '../SelectGroup'
import { SelectBoard } from '../SelectBoard'
import { MainCalendar } from '../MainCalendar'
import { Action, Boards, Groups } from '../../App'

const StyledSidebar = styled.nav`
  position: absolute;
  top: 5.375rem;
  left: 0;
  height: calc(100vh - 5.375rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  /* visibility: hidden; */
  /* display: none; */

  @media screen and (min-width: 768px) {
    position: static;
    left: 0;
    grid-column: 1/2;
    gap: 1rem;
  }

  @media screen and (min-width: 1024px) {
    position: static;
    grid-column: 1/4;
  }
`

interface SidebarProps {
  groups: Groups
  boards: Boards | null
  dispatch: React.Dispatch<Action>
  tasksByDate: Record<string, number> | null
}

const Sidebar: React.FC<SidebarProps> = ({
  groups,
  boards,
  dispatch,
  tasksByDate,
}) => {
  return (
    <StyledSidebar>
      <SelectGroup groups={groups} dispatch={dispatch} />
      <SelectBoard boards={boards} dispatch={dispatch} />
      <MainCalendar dispatch={dispatch} tasksByDate={tasksByDate} />
    </StyledSidebar>
  )
}

export { Sidebar }
