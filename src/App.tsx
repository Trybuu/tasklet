import styled from 'styled-components'
import Header from './components/Header/Header'
import { Sidebar } from './components/Sidebar'
import { Board } from './components/Board'
import { useReducer } from 'react'
import { Value } from 'react-calendar/src/shared/types.js'
import { isSameDay } from './utils/isSameDay'
import { FaSadTear } from 'react-icons/fa'

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto 1fr;
    gap: 0 1rem;
  }
`

const NothingToDisplay = styled.div`
  grid-column: 1/13;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray300};
  text-transform: lowercase;

  @media screen and (min-width: 768px) {
    grid-column: 2/7;
    padding: 0 1rem;
    padding-right: 1rem;
  }

  @media screen and (min-width: 1024px) {
    grid-column: 4/13;
    padding: 0;
    padding-right: 1rem;
  }
`

export type Action =
  | { type: 'select_group'; payload: string }
  | { type: 'add_group'; payload: Group }
  | { type: 'select_board'; payload: string }
  | { type: 'select_date'; payload: Value }
  | { type: 'add_board'; payload: Board }
  | {
      type: 'add_task'
      payload: NewTodo
    }
  | { type: 'edit_task'; payload: Todo }
  | { type: 'delete_task'; payload: string }
  | { type: 'move_task'; payload: { id: string; status: string } }
  | { type: 'delete_group'; payload: string }
  | { type: 'delete_board'; payload: string }
  | { type: 'edit_group'; payload: Group }
  | { type: 'edit_board'; payload: Board }

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

// Only for new tasks while creating
interface NewTodo {
  id: string
  title: string
  description: string
  icon: string
  status: string
  priority: 'niski' | 'normalny' | 'wysoki'
}
export interface Todo {
  id: string
  title: string
  description: string
  icon: string
  status: string
  priority: 'niski' | 'normalny' | 'wysoki'
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
      groupId: '92384792efhidsh2',
      groupName: 'Grupa domyślna',
      grupIcon: '☀️',
      active: true,
      boards: [
        {
          boardId: 'isudhfq9834yrfs',
          boardName: 'Tablica domyśna',
          boardIcon: '🤝',
          active: true,
          tasks: [],
        },
      ],
    },
  ],
}

function reducer(state: InitialState, action: Action): InitialState {
  switch (action.type) {
    case 'select_group':
      return {
        ...state,
        groups: state.groups.map((group) => ({
          ...group,
          active: group.groupId === action.payload,
        })),
      }

    case 'add_group':
      return {
        ...state,
        groups: [...state.groups, action.payload],
      }

    case 'select_board':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.active
            ? {
                ...group,
                boards: group.boards.map((board) => ({
                  ...board,
                  active: board.boardId === action.payload,
                })),
              }
            : group,
        ),
      }

    case 'add_board':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.active
            ? {
                ...group,
                boards: [...group.boards, action.payload],
              }
            : group,
        ),
      }

    case 'select_date':
      return {
        ...state,
        date: action.payload,
      }

    case 'add_task': {
      const selectedDate = state.date instanceof Date ? state.date : new Date()
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.active
            ? {
                ...group,
                boards: group.boards.map((board) =>
                  board.active
                    ? {
                        ...board,
                        tasks: [
                          ...board.tasks,
                          {
                            ...action.payload,
                            createdAt: selectedDate,
                          },
                        ],
                      }
                    : board,
                ),
              }
            : group,
        ),
      }
    }

    case 'edit_task':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.active
            ? {
                ...group,
                boards: group.boards.map((board) =>
                  board.active
                    ? {
                        ...board,
                        tasks: board.tasks.map((task) =>
                          task.id === action.payload.id
                            ? {
                                ...task,
                                title: action.payload.title,
                                description: action.payload.description,
                                icon: action.payload.icon,
                                status: action.payload.status,
                                priority: action.payload.priority,
                                createdAt: action.payload.createdAt,
                              }
                            : { ...task },
                        ),
                      }
                    : board,
                ),
              }
            : group,
        ),
      }

    case 'delete_task':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.active
            ? {
                ...group,
                boards: group.boards.map((board) =>
                  board.active
                    ? {
                        ...board,
                        tasks: board.tasks.filter(
                          (task) => task.id !== action.payload,
                        ),
                      }
                    : board,
                ),
              }
            : group,
        ),
      }
    case 'move_task':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.active
            ? {
                ...group,
                boards: group.boards.map((board) =>
                  board.active
                    ? {
                        ...board,
                        tasks: board.tasks.map((task) =>
                          task.id === action.payload.id
                            ? {
                                ...task,
                                status: action.payload.status,
                              }
                            : task,
                        ),
                      }
                    : board,
                ),
              }
            : group,
        ),
      }

    case 'delete_group':
      return {
        ...state,
        groups: state.groups.filter(
          (group) => group.groupId !== action.payload,
        ),
      }

    case 'delete_board':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.active
            ? {
                ...group,
                boards: group.boards.filter(
                  (board) => board.boardId !== action.payload,
                ),
              }
            : group,
        ),
      }

    default:
      return state
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const activeGroup = state.groups.find((group) => group.active)
  const activeBoard = activeGroup?.boards.find((board) => board.active)

  const tasksByDate = activeBoard?.tasks.reduce(
    (acc: Record<string, number>, task) => {
      if (task.createdAt instanceof Date) {
        const date = task.createdAt.toLocaleDateString('en-CA').split('T')[0]
        acc[date] = (acc[date] || 0) + 1
      }
      return acc
    },
    {},
  )

  console.log(tasksByDate)

  const activeTasks = activeBoard?.tasks.filter((task) => {
    return (
      task.createdAt instanceof Date &&
      isSameDay(new Date(task.createdAt), new Date(state.date as Date))
    )
  })

  return (
    <>
      <Main>
        <Header />
        <Sidebar
          groups={state.groups}
          boards={activeGroup?.boards || []}
          dispatch={dispatch}
          tasksByDate={tasksByDate || {}}
        />
        {activeGroup && activeBoard ? (
          <Board
            activeGroupName={activeGroup.groupName}
            activeBoardName={activeBoard.boardName}
            activeTasks={activeTasks || []}
            date={state.date}
            dispatch={dispatch}
          />
        ) : (
          <NothingToDisplay>
            <FaSadTear />
            <p>Brak aktywnej grupy lub tablicy</p>
          </NothingToDisplay>
        )}
      </Main>
    </>
  )
}

export default App
