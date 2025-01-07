import styled from 'styled-components'
import Header from './components/Header/Header'
import { Sidebar } from './components/Sidebar'
import { Board } from './components/Board'
import { useReducer } from 'react'

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
  createdAt: number
}

export type Boards = Board[]
export type Groups = Group[]
export type Todos = Todo[]

interface InitialState {
  groups: Groups
}

const initialState: InitialState = {
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
          ],
        },
        {
          boardId: '378468fa',
          boardName: 'Sprawy do zlecenia',
          boardIcon: '🛠️',
          active: false,
          tasks: [],
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
              createdAt: new Date().getTime(),
            },
            {
              id: 'khsdfsdf2hb',
              title: 'Nauczyć się 10 angielskich słówek',
              description: 'Angielski trzeba znać',
              icon: '📕',
              status: 'completed',
              priority: 'wysoki',
              createdAt: new Date().getTime(),
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
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const activeGroup = state.groups.filter((group) => group.active === true)
  const activeBoards = activeGroup[0].boards
  const activeBoard = activeBoards?.filter((board) => board?.active === true)
  const activeTasks = activeBoard[0]?.tasks

  console.log('😊😊 Active Tasks')
  console.log(activeTasks)

  if (!activeGroup || !activeBoard) {
    return <p>Loading...</p>
  }

  return (
    <Main>
      <Header />
      <Sidebar
        groups={state.groups}
        boards={activeBoards}
        dispatch={dispatch}
      />
      <Board
        activeGroupName={activeGroup[0].groupName}
        activeBoardName={activeBoard[0].boardName}
        activeTasks={activeTasks}
      />
    </Main>
  )
}

export default App
