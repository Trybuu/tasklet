import styled from 'styled-components'
import Header from './components/Header/Header'
import { Sidebar } from './components/Sidebar'
import { Board } from './components/Board'
import { useReducer } from 'react'
import { Value } from 'react-calendar/src/shared/types.js'
import { isSameDay } from './utils/isSameDay'

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto 1fr;
  gap: 0 1rem;
  height: 100vh;
  width: 100vw;
`

export type Action =
  | { type: 'select_group'; payload: string }
  | { type: 'add_group'; payload: Group }
  | { type: 'select_board'; payload: string }
  | { type: 'select_date'; payload: Value }
interface Group {
  groupId: string
  groupName: string
  grupIcon: string
  active: boolean
  boards: Boards
}

interface Board {
  boardId: string
  boardName: string
  boardIcon: string
  active: boolean
  tasks: Todos
}

interface Todo {
  id: string
  title: string
  description: string
  icon: string
  status: string
  priority: string
  createdAt: Value
}

export type Boards = Board[]
export type Groups = Group[]
export type Todos = Todo[]

interface InitialState {
  date: Value
  groups: Groups
}

const initialState: InitialState = {
  date: new Date(),
  groups: [
    {
      groupId: '210239eu',
      groupName: 'Remont mieszkania',
      grupIcon: '🏠',
      active: true,
      boards: [
        {
          boardId: '378468da',
          boardName: 'Zadania codzienne',
          boardIcon: '✅',
          active: true,
          tasks: [
            {
              id: 'hadsb8q43grhasd',
              title: 'Nadmuchać balony na imprezę',
              description: 'Dziś moje urodziny!',
              icon: '🎈',
              status: 'in-progress',
              priority: 'normalny',
              createdAt: new Date('Wed Jan 08 2025 00:00:00 GMT+0100'),
            },
            {
              id: 'khsdv87q34ghb',
              title: 'Nauczyć się 10 angielskich słówek',
              description: 'Angielski trzeba znać',
              icon: '📕',
              status: 'completed',
              priority: 'wysoki',
              createdAt: new Date('Wed Jan 08 2025 00:00:00 GMT+0100'),
            },
          ],
        },
        {
          boardId: '378468fa',
          boardName: 'Sprawy do zlecenia',
          boardIcon: '🛠️',
          active: false,
          tasks: [
            {
              id: 'hadsb8q645645',
              title: 'Zlecić położenie płytek w łazience',
              description: 'Pan Zdzisiu to podobno dobry fachura',
              icon: '🚿',
              status: 'planned',
              priority: 'niski',
              createdAt: new Date('Wed Jan 09 2025 00:00:00 GMT+0100'),
            },
            {
              id: 'khsdv87q35464',
              title: 'Skoantaktować się z Panem od kuchni na wymiar',
              description: 'Kacper Kuchenny - 783 235 223',
              icon: '🧑‍🍳',
              status: 'in-progress',
              priority: 'wysoki',
              createdAt: new Date('Wed Jan 09 2025 00:00:00 GMT+0100'),
            },
          ],
        },
      ],
    },
    {
      groupId: '7634872sf',
      groupName: 'Przyjęcie urodzinowe',
      grupIcon: '🍷',
      active: false,
      boards: [
        {
          boardId: '37846asfad',
          boardName: 'Spotkania',
          boardIcon: '🤝',
          active: true,
          tasks: [
            {
              id: 'sdfsdfs3',
              title: 'Spotkać się z dekoratorką',
              description: 'Dom musi być perfekcyjnie przygotowany!',
              icon: '🎈',
              status: 'planned',
              priority: 'normalny',
              createdAt: new Date('Wed Jan 08 2025 00:00:00 GMT+0100'),
            },
            {
              id: 'khsdfsdf2hb',
              title: 'Nauczyć się 10 angielskich słówek',
              description: 'Angielski trzeba znać',
              icon: '📕',
              status: 'completed',
              priority: 'wysoki',
              createdAt: new Date('Wed Jan 09 2025 00:00:00 GMT+0100'),
            },
            {
              id: 'khsdfsdf2hbasf',
              title: 'Nauczyć się 5 niemieckich słówek',
              description: 'Nauka niemieckiego',
              icon: '📕',
              status: 'completed',
              priority: 'wysoki',
              createdAt: new Date('Wed Jan 09 2025 00:00:00 GMT+0100'),
            },
          ],
        },
      ],
    },
  ],
}

function reducer(state: InitialState, action: Action) {
  switch (action.type) {
    case 'select_group':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.groupId === action.payload
            ? { ...group, active: true }
            : { ...group, active: false },
        ),
      }
    case 'add_group':
      return {
        ...state,
        ...action.payload,
      }
    case 'select_board':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.active === true
            ? {
                ...group,
                boards: group.boards.map((board) =>
                  board.boardId === action.payload
                    ? { ...board, active: true }
                    : { ...board, active: false },
                ),
              }
            : group,
        ),
      }
    case 'select_date':
      console.log('ZMIANA DATY')
      console.log(state.date)
      return {
        ...state,
        date: action.payload,
      }
    default:
      return state
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const activeGroup = state.groups.filter((group) => group.active === true)
  const activeBoards = activeGroup[0].boards
  const activeBoard = activeBoards?.filter((board) => board?.active === true)

  const tasksByDate = activeBoard[0].tasks.reduce(
    (acc: Record<string, number>, task) => {
      if (!task || !(task.createdAt instanceof Date)) return acc

      const date = task.createdAt.toISOString().split('T')[0]

      acc[date] = (acc[date] || 0) + 1

      return acc
    },
    {},
  )

  const activeTasks = activeBoard[0]?.tasks.filter((task) => {
    if (!task || !task.createdAt || !state.date) return false

    if (task.createdAt instanceof Date) {
      return isSameDay(new Date(task.createdAt), new Date(state.date as Date))
    }
  })

  if (!activeGroup || !activeBoard) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Main>
        <Header />
        <Sidebar
          groups={state.groups}
          boards={activeBoards}
          dispatch={dispatch}
          tasksByDate={tasksByDate}
        />
        <Board
          activeGroupName={activeGroup[0].groupName}
          activeBoardName={activeBoard[0].boardName}
          activeTasks={activeTasks}
          date={state.date}
        />
      </Main>
    </>
  )
}

export default App
