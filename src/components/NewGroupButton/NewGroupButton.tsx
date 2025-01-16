import { useState } from 'react'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { LuPlus } from 'react-icons/lu'
import { FaLayerGroup } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'
import { Action } from '../../App'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const StyledInput = styled.input`
  padding: 1rem;

  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 0.5rem;
  outline: none;
`

const StyledInputButton = styled.input`
  padding: 1rem;

  background-color: ${({ theme }) => theme.colors.gray200};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 0.5rem;
  outline: none;
`

const StyledErrorMessage = styled.p`
  font-size: 0.8rem;
  color: #dd1d1d;
`

interface NewGroupButtonProps {
  dispatch: React.Dispatch<Action>
}

export const NewGroupButton: React.FC<NewGroupButtonProps> = ({ dispatch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      groupName: '',
      groupIcon: '',
    },
  })

  console.log(errors)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <LuPlus />
      </Button>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        icon={<FaLayerGroup />}
        title="Dodaj nową grupę"
      >
        <StyledForm
          onSubmit={handleSubmit((data) => {
            console.log(data)

            const newBoard = {
              groupId: uuidv4(),
              groupName: data.groupName,
              grupIcon: data.groupIcon,
              active: false,
              boards: [],
            }

            dispatch({ type: 'add_group', payload: newBoard })
          })}
        >
          <StyledInput
            {...register('groupName', {
              required: true,
              minLength: { value: 4, message: 'Nazwa grupy jest zbyt krótka' },
            })}
            type="text"
            placeholder="Nazwa grupy"
          />
          <StyledErrorMessage>{errors.groupName?.message}</StyledErrorMessage>

          <StyledInput
            {...register('groupIcon', {
              required: 'Konieczne jest określenie ikony grupy',
            })}
            type="text"
            placeholder="Ikona grupy"
          />
          <StyledErrorMessage>{errors.groupIcon?.message}</StyledErrorMessage>

          <StyledInputButton type="submit" value="Utwórz grupę" />
        </StyledForm>
      </Modal>
    </>
  )
}
