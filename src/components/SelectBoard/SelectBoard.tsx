import styled from 'styled-components'
import { Action, Boards } from '../../App'

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
  dispatch: React.Dispatch<Action>
}

const SelectBoard: React.FC<SelectBoardProps> = ({ boards, dispatch }) => {
  const handleOnClick = (boardId: string) => {
    console.log(boardId)
    dispatch({ type: 'select_board', payload: boardId })
  }

  return (
    <SelectBoardWrapper>
      <h3>Tablice</h3>
      <SelectBoardList>
        {boards.map((board) => (
          <SelectBoardListElement
            key={board.boardId}
            $active={board.active}
            onClick={() => handleOnClick(board.boardId)}
          >
            {board.boardIcon} {board.boardName}
          </SelectBoardListElement>
        ))}
      </SelectBoardList>
    </SelectBoardWrapper>
  )
}

export { SelectBoard }
