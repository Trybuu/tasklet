import styled from 'styled-components'

const Button = styled.button`
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 0.5rem;
  transition: 0.2s ease-in-out;
  cursor: pointer;
`

interface UserProfileButtonProps {
  username: string
}

export const UserProfileButton: React.FC<UserProfileButtonProps> = ({
  username,
}) => {
  const firstLetter = username[0]

  return <Button aria-label="user-profile-button">{firstLetter}</Button>
}
