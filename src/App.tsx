import styled from 'styled-components'
import Header from './components/Header/Header'
import { Sidebar } from './components/Sidebar'
import { Board } from './components/Board'

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto 1fr;
  gap: 0 1rem;
  height: 100vh;
  width: 100vw;
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

interface Board {
  boardId: string
  boardName: string
  boardIcon: string
  tasks: Task[]
}

// interface Group {
//   groupId: string
//   groupName: string
//   groupIcon: string
//   boards: Board[]
// }

// const data: Group[] = [
//   {
//     groupId: 'asd231',
//     groupName: 'Przyjęcie urodzinowe',
//     groupIcon: '🎉',
//     boards: [
//       {
//         boardId: 'asfdu2390',
//         boardName: 'Plan dzienny',
//         boardIcon: '✅',

//         tasks: [
//           {
//             id: 'asodjbfiasd7yf9238',
//             title: 'Wynieść śmieci',
//             description: 'Żona mi każe...',
//             icon: '🚮',
//             status: 'planned',
//             priority: 'niski',
//             createdAt: new Date().getTime(),
//           },
//         ],
//       },
//     ],
//   },
// ]

const App: React.FC = () => {
  return (
    <Main>
      <Header />
      <Sidebar />
      <Board />
    </Main>
  )
}

export default App
