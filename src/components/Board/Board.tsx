import styled from 'styled-components'
import { BoardInfo } from '../BoardInfo'
import { Tasks } from '../Tasks/Tasks'

const StyledBoard = styled.section`
  grid-column: 4/13;
`

export interface Task {
  id: number
  title: string
  description: string
  icon: string
  status: 'planned' | 'in-progress' | 'completed'
  priority: 'niski' | 'normalny' | 'wysoki'
  createdAt: number
}

const tasks: Task[] = [
  {
    id: 0,
    title: 'Wynieść śmieci',
    description: 'Żona mi każe...',
    icon: '🚮',
    status: 'planned',
    priority: 'niski',
    createdAt: new Date().getTime(),
  },
  {
    id: 1,
    title:
      'Nakarmić psa, który dużo sra no ale co, trzeba zrobić nie ma innej możliwości',
    description:
      'Piesek rasy bulterier, trzeba go nafaszerować ziemniakami aby zdrowo rósł.',
    icon: '🐶',
    status: 'planned',
    priority: 'wysoki',
    createdAt: new Date().getTime(),
  },
  {
    id: 2,
    title: 'Nadmuchać balony na imprezę',
    description: 'Dziś moje urodziny!',
    icon: '🎈',
    status: 'in-progress',
    priority: 'normalny',
    createdAt: new Date().getTime(),
  },
  {
    id: 3,
    title: 'Nauczyć się 10 angielskich słówek',
    description: 'Angielski trzeba znać',
    icon: '📕',
    status: 'completed',
    priority: 'wysoki',
    createdAt: new Date().getTime(),
  },
]

interface Board {
  boardId: string
  boardName: string
  boardIcon: string
  tasks: Task[]
}

interface Group {
  groupId: string
  groupName: string
  groupIcon: string
  boards: Board[]
}

const data: Group[] = [
  {
    groupId: 'asd231',
    groupName: 'Przyjęcie urodzinowe',
    groupIcon: '🎉',
    boards: [
      {
        boardId: 'asfdu2390',
        boardName: 'Plan dzienny',
        boardIcon: '✅',
        tasks: [
          {
            id: 0,
            title: 'Wynieść śmieci',
            description: 'Żona mi każe...',
            icon: '🚮',
            status: 'planned',
            priority: 'niski',
            createdAt: new Date().getTime(),
          },
        ],
      },
    ],
  },
]

const Board: React.FC = () => {
  return (
    <StyledBoard>
      <BoardInfo activeGroup="Wybrana grupa" activeBoard="Wybrana tablica" />
      <Tasks tasks={tasks} />
    </StyledBoard>
  )
}

export { Board }
