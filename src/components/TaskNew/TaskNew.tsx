import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { FaPlus } from 'react-icons/fa'
import styled from 'styled-components'
import { Modal } from '../Modal'
import { MdAddTask } from 'react-icons/md'
import { CustomForm } from '../Form'
import { useForm, FormProvider } from 'react-hook-form'
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
      required: 'Nazwa zadania jest wymagana',
      minLength: { value: 4, message: 'Zbyt krótka nazwa zadania' },
    },
  },
  {
    name: 'taskDescription',
    type: 'text',
    placeholder: 'Krótki opis zadania',
    validation: {
      required: 'Opis zadania jest wymagany',
      minLength: { value: 4, message: 'Zbyt krótki opis zadania' },
    },
  },
  {
    name: 'icon',
    type: 'emoji',
    placeholder: 'Ikona zadania',
    validation: {
      required: 'Ikona jest wymagana',
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
      required: 'Wybierz priorytet zadania',
    },
  },
]

interface TaskNewProps {
  status: string
  dispatch: React.Dispatch<Action>
}

export const TaskNew: React.FC<TaskNewProps> = ({ status, dispatch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const methods = useForm()

  return (
    <>
      <AddTaskButton onClick={() => setIsModalOpen(true)}>
        <FaPlus />
      </AddTaskButton>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Dodaj nowe zadanie"
        icon={<MdAddTask />}
      >
        <FormProvider {...methods}>
          <CustomForm
            fields={fields}
            onSubmit={methods.handleSubmit((data) => {
              const newTask = {
                id: uuidv4(),
                title: data.taskName,
                description: data.taskDescription,
                icon: data.icon,
                status: status,
                priority: data.taskPriority,
              }

              dispatch({ type: 'add_task', payload: newTask })
              methods.reset()
              setIsModalOpen(false)
            })}
            submitButtonValue="Utwórz zadanie"
          />
        </FormProvider>
      </Modal>
    </>
  )
}
