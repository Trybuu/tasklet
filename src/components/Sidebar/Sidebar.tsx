import styled from 'styled-components'

const StyledSidebar = styled.nav`
  grid-column: 1/4;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
`

interface SidebarProps {
  activeGroup: string
}

const Sidebar: React.FC<SidebarProps> = ({ activeGroup }) => {
  return (
    <StyledSidebar>
      <select>
        <option value={activeGroup}>{activeGroup}</option>
      </select>
    </StyledSidebar>
  )
}

export { Sidebar }
