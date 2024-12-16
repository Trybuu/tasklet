import styled from 'styled-components'
import Header from './components/Header/Header'

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto 1fr;
  height: 100vh;
  width: 100vw;
`

const App: React.FC = () => {
  return (
    <Main>
      <Header />
    </Main>
  )
}

export default App
