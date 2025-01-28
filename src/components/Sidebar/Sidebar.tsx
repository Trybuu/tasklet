import styled from 'styled-components'
import { SelectGroup } from '../SelectGroup'
import { SelectBoard } from '../SelectBoard'
import { MainCalendar } from '../MainCalendar'
import { Action, Boards, Groups } from '../../App'
import { SidebarExpandButton } from '../SidebarExpandButton'
import { useState } from 'react'

const StyledSidebar = styled.nav<{ $isSidebarOpen: boolean }>`
  position: absolute;
  top: 5.375rem;
  left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '0' : '-300%')};
  max-width: 100vw;
  height: calc(100vh - 5.375rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  transition: 0.2s ease-in-out;

  @media screen and (min-width: 768px) {
    position: static;
    left: 0;
    max-width: 100%;
    grid-column: 1/2;
  }

  @media screen and (min-width: 1024px) {
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
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  return (
    <>
      <StyledSidebar $isSidebarOpen={isSidebarOpen}>
        <SelectGroup groups={groups} dispatch={dispatch} />
        <SelectBoard boards={boards} dispatch={dispatch} />
        <MainCalendar dispatch={dispatch} tasksByDate={tasksByDate} />
      </StyledSidebar>

      <SidebarExpandButton
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        isOpen={isSidebarOpen}
      />
    </>
  )
}

export { Sidebar }
