import styled from 'styled-components'

const StyledLogo = styled.h1`
  margin-right: auto;
  color: ${({ theme }) => theme.colors.accent};
`

export const Logo: React.FC = () => {
  return <StyledLogo>Tasklet</StyledLogo>
}
