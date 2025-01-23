import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { FaPlus } from 'react-icons/fa'
import styled from 'styled-components'
import { Modal } from '../Modal'
import { MdAddTask } from 'react-icons/md'
import { CustomForm } from '../Form'
import { useForm } from 'react-hook-form'
import { Action } from '../../App'

const AddTaskButton = styled.button`
  padding: 1rem;
  color: ${({ theme }) => theme.colors.gray100};
  background-color: transparent;
  border: 3px dotted ${({ theme }) => theme.colors.gray100};
  border-radius: 0.5rem;
`

const fields = [
  {
    name: 'taskName',
    type: 'text',
    placeholder: 'Nazwa zadania',
    validation: {
      required: true,
      minLength: { value: 4, message: 'Zbyt krótka nazwa zadania' },
    },
  },
  {
    name: 'taskDescription',
    type: 'text',
    placeholder: 'Krótki opis zadania',
    validation: {
      required: true,
      minLength: { value: 4, message: 'Zbyt krótki opis zadania' },
    },
  },
  {
    name: 'taskIcon',
    type: 'emoji',
    placeholder: 'Ikona zadania',
    validation: {
      required: true,
      minLength: { value: 1, message: 'Zadanie musi posiadać ikonę' },
    },
  },
  {
    name: 'taskPriority',
    type: 'select',
    options: [
      {
        value: 'niski',
        textContent: 'niski priorytet',
      },
      {
        value: 'normalny',
        textContent: 'normalny priorytet',
      },
      {
        value: 'wysoki',
        textContent: 'wysoki priorytet',
      },
    ],
    placeholder: 'Priorytet zadania',
    validation: {
      required: true,
    },
  },
]

interface TaskNewProps {
  status: string
  dispatch: React.Dispatch<Action>
}

export const TaskNew: React.FC<TaskNewProps> = ({ status, dispatch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  return (
    <>
      <AddTaskButton onClick={() => setIsModalOpen(true)}>
        <FaPlus />
      </AddTaskButton>

      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
        title="Dodaj nowe zadanie"
        icon={<MdAddTask />}
      >
        <CustomForm
          fields={fields}
          onSubmit={handleSubmit((data) => {
            const newTask = {
              id: uuidv4(),
              title: data.taskName,
              description: data.taskDescription,
              icon: data.taskIcon,
              status: status,
              priority: data.taskPriority,
            }
            console.log('🤝 DATA Z ADD TASK 🤝')
            console.log(data)

            dispatch({ type: 'add_task', payload: newTask })
            reset()
            setIsModalOpen(false)
          })}
          errors={errors}
          register={register}
          submitButtonValue="Utwórz zadanie"
        />
      </Modal>
    </>
  )
}
