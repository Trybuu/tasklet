import { IoSettingsOutline } from 'react-icons/io5'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { useState } from 'react'
import { MdEditNote } from 'react-icons/md'
import { Action, Groups } from '../../App'
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

interface EditGroupsProps {
  dispatch: React.Dispatch<Action>
  groups: Groups
}

export const EditGroupsButton: React.FC<EditGroupsProps> = ({
  dispatch,
  groups,
}) => {
  const [editableGroupId] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  //   const handleOnEdit = (id: string) => {
  //     if (editableGroupId !== id) setEditableGroupId(id)
  //     else setEditableGroupId('')
  //   }

  const handleOnDelete = (id: string, groupName: string) => {
    const confirmed = window.confirm(
      `Czy na pewno chcesz usunąć grupę: ${groupName}`,
    )

    if (confirmed) {
      dispatch({ type: 'delete_group', payload: id })
    }
  }

  const groupsElements = groups.map((group, index) => (
    <EditableElementsGroup
      key={index}
      $disabled={group.groupId !== editableGroupId}
    >
      <EditableInput
        type="text"
        value={group.grupIcon}
        disabled={editableGroupId !== group.groupId}
      />
      <EditableInput
        value={group.groupName}
        disabled={editableGroupId !== group.groupId}
      />
      <ButtonsGroup>
        {/* <Button onClick={() => handleOnEdit(group.groupId)}>Edytuj</Button> */}
        <Button
          $unsafe={true}
          onClick={() => handleOnDelete(group.groupId, group.groupName)}
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
        title="Usuń grupy"
        icon={<MdEditNote />}
      >
        {groupsElements}
      </Modal>
    </>
  )
}
