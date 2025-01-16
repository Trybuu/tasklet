import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { LuPlus } from 'react-icons/lu'
import { MdDashboardCustomize } from 'react-icons/md'
import { CustomForm } from '../Form'
import { Action } from '../../App'
import { v4 as uuidv4 } from 'uuid'

interface NewBoardButtonProps {
  dispatch: React.Dispatch<Action>
}

export const NewBoardButton: React.FC<NewBoardButtonProps> = ({ dispatch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const fields = [
    {
      name: 'boardName',
      type: 'text',
      placeholder: 'Nazwa grupy',
      validation: {
        required: true,
        minLength: { value: 4, message: 'Nazwa tablicy jest zbyt krótka' },
      },
    },
    {
      name: 'boardIcon',
      type: 'text',
      placeholder: 'Ikona tablicy',
      validation: {
        required: true,
        maxLength: { value: 2, message: 'Tablica powinna zawierać ikonę' },
      },
    },
  ]

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <LuPlus />
      </Button>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        icon={<MdDashboardCustomize />}
        title="Dodaj nową tablicę"
      >
        <CustomForm
          fields={fields}
          onSubmit={handleSubmit((data) => {
            console.log(data)
            const newBoard = {
              boardId: uuidv4(),
              boardName: data.boardName,
              boardIcon: data.boardIcon,
              active: false,
              tasks: [],
            }

            dispatch({ type: 'add_board', payload: newBoard })
          })}
          errors={errors}
          register={register}
          submitButtonValue="Utwórz nową tablicę"
        />
      </Modal>
    </>
  )
}
