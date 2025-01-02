import styled from 'styled-components'
import { SelectGroup } from '../SelectGroup'
import { SelectBoard } from '../SelectBoard'
import { MainCalendar } from '../MainCalendar'

const StyledSidebar = styled.nav`
  grid-column: 1/4;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
`

const Sidebar: React.FC = () => {
  return (
    <StyledSidebar>
      <SelectGroup />
      <SelectBoard />
      <MainCalendar />
    </StyledSidebar>
  )
}

export { Sidebar }
