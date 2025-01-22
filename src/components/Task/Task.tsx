import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { TaskInterface } from '../Board'
import { TaskPriority } from '../TaskPriority'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../../dnd/Constants'
import { BsThreeDots } from 'react-icons/bs'
import { Modal } from '../Modal'
import { useState } from 'react'
import { MdEditNote } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { Action } from '../../App'
import { CustomForm } from '../Form'
import { FaCreativeCommonsPdAlt } from 'react-icons/fa'
import { ButtonDelete } from '../ButtonDelete/ButtonDelete'
import { Button } from '../Button'

const StyledTask = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  min-height: 16rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.gray300};
`

const StyledTaskDescription = styled.p`
  font-weight: 300;
`

const StyledTaskIcon = styled.div`
  font-size: 1.25rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
`

const StyledThreeDotsButton = styled.button`
  margin-left: auto;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.gray400};
  background-color: transparent;
  border: none;
  cursor: pointer;
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
  {
    name: 'taskStatus',
    type: 'select',
    options: [
      {
        value: 'planned',
        textContent: 'Status - zaplanowany',
      },
      {
        value: 'in-progress',
        textContent: 'Status - w trakcie',
      },
      {
        value: 'completed',
        textContent: 'Status - zakończony',
      },
    ],
    placeholder: 'Status zadania',
    validation: {
      required: true,
    },
  },
]
interface TaskProps {
  task: TaskInterface
  dispatch: React.Dispatch<Action>
}

const Task: React.FC<TaskProps> = ({ task, dispatch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id: task.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [],
  )

  const handleOnClick = () => {
    reset({
      taskName: task.title,
      taskDescription: task.description,
      taskIcon: task.icon,
      taskPriority: task.priority,
      taskStatus: task.status,
    })

    setIsModalOpen(true)
  }

  return (
    <>
      <StyledTask
        ref={dragRef}
        style={{ border: isDragging ? '5px solid pink' : 'none' }}
      >
        <StyledThreeDotsButton onClick={handleOnClick}>
          <BsThreeDots />
        </StyledThreeDotsButton>
        <StyledTaskIcon>{task.icon}</StyledTaskIcon>
        <h3>{task.title}</h3>
        <StyledTaskDescription>{task.description}</StyledTaskDescription>
        <TaskPriority priority={task.priority} />
      </StyledTask>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edytuj zadanie"
        icon={<MdEditNote />}
      >
        <CustomForm
          fields={fields}
          onSubmit={handleSubmit((data) => {
            const editedTask = {
              id: task.id,
              title: data.taskName,
              description: data.taskDescription,
              icon: data.taskIcon,
              status: data.taskStatus,
              priority: data.taskPriority,
              createdAt: task.createdAt,
            }
            console.log('🤝 DATA Z EDIT TASK 🤝')
            console.log(editedTask)

            dispatch({ type: 'edit_task', payload: editedTask })
            reset()
            setIsModalOpen(false)
          })}
          errors={errors}
          register={register}
          submitButtonValue="Edytuj zadanie"
        />

        <Button
          onClick={() => {
            dispatch({ type: 'delete_task', payload: task.id })
          }}
          $unsafe={true}
        >
          Usuń zadanie
        </Button>
      </Modal>
    </>
  )
}

export { Task }
