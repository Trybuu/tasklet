import { IoSettingsOutline } from 'react-icons/io5'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { useState } from 'react'
import { MdEditNote } from 'react-icons/md'
import { Action, Boards } from '../../App'
import styled from 'styled-components'

const EditableElementsGroup = styled.div<{ $disabled: boolean }>`
  display: flex;
  border-radius: 0.5rem;
  background-color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.gray200 : 'transparent'};
`

const EditableInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: none;
  background-color: transparent;
`

const ButtonsGroup = styled.div`
  display: flex;
  padding: 1rem;
  gap: 0.5rem;
`

interface EditBoardsButtonProps {
  dispatch: React.Dispatch<Action>
  boards: Boards
}

export const EditBoardsButton: React.FC<EditBoardsButtonProps> = ({
  dispatch,
  boards,
}) => {
  const [editableBoardId] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleOnDelete = (id: string, boardName: string) => {
    const confirmed = window.confirm(
      `Czy na pewno chcesz usunąć tablicę: ${boardName}`,
    )

    if (confirmed) dispatch({ type: 'delete_board', payload: id })
  }

  const boardsElements = boards.map((board, index) => (
    <EditableElementsGroup
      key={index}
      $disabled={board.boardId !== editableBoardId}
    >
      <EditableInput
        type="text"
        value={board.boardIcon}
        disabled={editableBoardId !== board.boardId}
      />
      <EditableInput
        value={board.boardName}
        disabled={editableBoardId !== board.boardId}
      />
      <ButtonsGroup>
        {/* <Button onClick={() => handleOnEdit(board.boardId)}>Edytuj</Button> */}
        <Button
          $unsafe={true}
          onClick={() => handleOnDelete(board.boardId, board.boardName)}
        >
          Usuń
        </Button>
      </ButtonsGroup>
    </EditableElementsGroup>
  ))

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <IoSettingsOutline />
      </Button>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Usuń tablice"
        icon={<MdEditNote />}
      >
        {boardsElements}
      </Modal>
    </>
  )
}
