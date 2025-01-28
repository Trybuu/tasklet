import styled from 'styled-components'
import { MdArrowLeft, MdArrowRight } from 'react-icons/md'

const StyledExpandButton = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 0;
  height: 2rem;
  width: 2rem;
  transform: translateY(-50%);
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 0 50% 50% 0;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    display: none;
  }
`

interface SidebarExpandButtonProps {
  onClick: () => void
  isOpen: boolean
}

export const SidebarExpandButton: React.FC<SidebarExpandButtonProps> = ({
  onClick,
  isOpen,
}) => {
  return (
    <StyledExpandButton onClick={onClick}>
      {isOpen ? <MdArrowLeft /> : <MdArrowRight />}
    </StyledExpandButton>
  )
}
