import styled from 'styled-components'
import { Action, Boards } from '../../App'
import { NewBoardButton } from '../NewBoardButton/NewBoardButton'
import { SidebarSectionTitle } from '../SidebarSectionTitle'
import { EditBoardsButton } from '../EditBoardsButton'

const SelectBoardWrapper = styled.div``

const SelectBoardList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
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
  boards: Boards | null
  dispatch: React.Dispatch<Action>
}

const SelectBoard: React.FC<SelectBoardProps> = ({ boards, dispatch }) => {
  const handleOnClick = (boardId: string) => {
    console.log(boardId)
    dispatch({ type: 'select_board', payload: boardId })
  }

  if (!boards) {
    return <p>Brak Tablic</p>
  }

  return (
    <SelectBoardWrapper>
      <SidebarSectionTitle title="Tablice">
        <NewBoardButton dispatch={dispatch} />
        <EditBoardsButton dispatch={dispatch} boards={boards} />
      </SidebarSectionTitle>
      <SelectBoardList>
        {boards ? (
          boards.map((board) => (
            <SelectBoardListElement
              key={board.boardId}
              $active={board.active}
              onClick={() => handleOnClick(board.boardId)}
            >
              {board.boardIcon} {board.boardName}
            </SelectBoardListElement>
          ))
        ) : (
          <p>Brak Tablic</p>
        )}
      </SelectBoardList>
    </SelectBoardWrapper>
  )
}

export { SelectBoard }
