import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
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
  const methods = useForm()

  const fields = [
    {
      name: 'boardName',
      type: 'text',
      placeholder: 'Nazwa tablicy',
      validation: {
        required: true,
        minLength: { value: 4, message: 'Nazwa tablicy jest zbyt krótka' },
      },
    },
    {
      name: 'icon',
      type: 'emoji',
      placeholder: 'Ikona tablicy',
      validation: {
        required: true,
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
        <FormProvider {...methods}>
          <CustomForm
            fields={fields}
            onSubmit={methods.handleSubmit((data) => {
              const newBoard = {
                boardId: uuidv4(),
                boardName: data.boardName,
                boardIcon: data.icon,
                active: false,
                tasks: [],
              }

              dispatch({ type: 'add_board', payload: newBoard })
              methods.reset()
              setIsModalOpen(false)
            })}
            submitButtonValue="Utwórz nową tablicę"
          />
        </FormProvider>
      </Modal>
    </>
  )
}
