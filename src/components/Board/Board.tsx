import styled from 'styled-components'
import { BoardInfo } from '../BoardInfo'
import { Tasks } from '../Tasks/Tasks'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const StyledBoard = styled.section`
  grid-column: 4/13;
`

export interface Task {
  id: string
  title: string
  description: string
  icon: string
  status: 'planned' | 'in-progress' | 'completed'
  priority: 'niski' | 'normalny' | 'wysoki'
  createdAt: number
}

const tasks: Task[] = [
  {
    id: 'adshaosdf',
    title: 'Wynieść śmieci',
    description: 'Żona mi każe...',
    icon: '🚮',
    status: 'planned',
    priority: 'niski',
    createdAt: new Date().getTime(),
  },
  {
    id: 'asdgaeyfhqwuehdfcv',
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
    id: 'hadsb8q43grhasd',
    title: 'Nadmuchać balony na imprezę',
    description: 'Dziś moje urodziny!',
    icon: '🎈',
    status: 'in-progress',
    priority: 'normalny',
    createdAt: new Date().getTime(),
  },
  {
    id: 'khsdv87q34ghb',
    title: 'Nauczyć się 10 angielskich słówek',
    description: 'Angielski trzeba znać',
    icon: '📕',
    status: 'completed',
    priority: 'wysoki',
    createdAt: new Date().getTime(),
  },
]

const Board: React.FC = () => {
  return (
    <StyledBoard>
      <BoardInfo activeGroup="Wybrana grupa" activeBoard="Wybrana tablica" />
      <DndProvider backend={HTML5Backend}>
        <Tasks tasks={tasks} />
      </DndProvider>
    </StyledBoard>
  )
}

export { Board }
