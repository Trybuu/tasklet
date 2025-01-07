import styled from 'styled-components'
import { Boards } from '../../App'

const SelectBoardWrapper = styled.div``

const SelectBoardList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0;
`

const SelectBoardListElement = styled.li<{ $active: boolean }>`
  padding: 1rem;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.white : 'transparent'};
  border-radius: 0.5rem;
  cursor: pointer;
`

interface SelectBoardProps {
  boards: Boards
}

const SelectBoard: React.FC<SelectBoardProps> = ({ boards }) => {
  // if(boards?.length === 0){
  //   return ()
  // }

  return (
    <SelectBoardWrapper>
      <h3>Tablice</h3>
      <SelectBoardList>
        {boards.map((board) => (
          <SelectBoardListElement key={board.boardId} $active={board.active}>
            {board.boardIcon} {board.boardName}
          </SelectBoardListElement>
        ))}
      </SelectBoardList>
    </SelectBoardWrapper>
  )
}

export { SelectBoard }
