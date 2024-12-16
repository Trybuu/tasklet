import styled from 'styled-components'
import { Logo } from '../Logo'
import { Search } from '../Search'
import { User } from '../User/User'

const StyledHeader = styled.header`
  display: grid;
  grid-row: 1;
  grid-column: 1/13;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
`

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Logo />
      <Search />
      <User />
    </StyledHeader>
  )
}

export default Header
