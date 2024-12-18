import styled from 'styled-components'

const StyledLogo = styled.h1`
  font-family: 'Caveat Brush', serif;
  font-weight: 400;
  font-style: normal;
  margin-right: auto;
  color: ${({ theme }) => theme.colors.accent};
`

export const Logo: React.FC = () => {
  return <StyledLogo>Tasklet</StyledLogo>
}
