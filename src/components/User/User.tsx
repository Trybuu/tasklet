import styled from 'styled-components'

const Button = styled.button`
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 0.5rem;
  transition: 0.2s ease-in-out;
  cursor: pointer;
`

export const User: React.FC = () => {
  return <Button>G</Button>
}
