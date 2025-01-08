import styled from 'styled-components'
import { SelectGroup } from '../SelectGroup'
import { SelectBoard } from '../SelectBoard'
import { MainCalendar } from '../MainCalendar'
import { Action, Boards, Groups } from '../../App'

const StyledSidebar = styled.nav`
  grid-column: 1/3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
`

interface SidebarProps {
  groups: Groups
  boards: Boards
  dispatch: React.Dispatch<Action>
}

const Sidebar: React.FC<SidebarProps> = ({ groups, boards, dispatch }) => {
  return (
    <StyledSidebar>
      <SelectGroup groups={groups} dispatch={dispatch} />
      <SelectBoard boards={boards} dispatch={dispatch} />
      <MainCalendar />
    </StyledSidebar>
  )
}

export { Sidebar }
