import { useState } from 'react'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { LuPlus } from 'react-icons/lu'
import { FaLayerGroup } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { Action } from '../../App'
import { CustomForm } from '../Form'
interface NewGroupButtonProps {
  dispatch: React.Dispatch<Action>
}

export const NewGroupButton: React.FC<NewGroupButtonProps> = ({ dispatch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      groupName: '',
      groupIcon: '',
    },
  })

  const fields = [
    {
      name: 'groupName',
      type: 'text',
      placeholder: 'Nazwa grupy',
      validation: {
        required: true,
        minLength: { value: 4, message: 'Nazwa grupy jest zbyt krótka' },
      },
    },
    {
      name: 'groupIcon',
      type: 'text',
      placeholder: 'Ikona grupy',
      validation: {
        required: 'Konieczne jest określenie ikony grupy',
      },
    },
  ]

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
        <CustomForm
          fields={fields}
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
            reset()
            setIsModalOpen(false)
          })}
          errors={errors}
          register={register}
          submitButtonValue="Utwórz nową grupę"
        />
      </Modal>
    </>
  )
}
