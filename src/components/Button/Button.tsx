import styled from 'styled-components'

const StyledButton = styled.button<{ $unsafe: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  padding: 0.5rem;
  color: ${({ theme, $unsafe }) => ($unsafe ? theme.colors.red : null)};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 0.5rem;
  transition: 0.2s ease-in-out;
  cursor: pointer;
`

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  $unsafe?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  $unsafe = false,
}) => {
  return (
    <StyledButton onClick={onClick} $unsafe={$unsafe}>
      {children}
    </StyledButton>
  )
}
