import styled from 'styled-components'

const StyledSidebar = styled.nav`
  grid-column: 1/4;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
`

const Sidebar: React.FC = () => {
  return <StyledSidebar></StyledSidebar>
}

export { Sidebar }
