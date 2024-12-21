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
