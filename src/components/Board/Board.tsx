import styled from 'styled-components'
import { BoardInfo } from '../BoardInfo'
import { Tasks } from '../Tasks/Tasks'

const StyledBoard = styled.section`
  grid-column: 4/13;
`

const Board: React.FC = () => {
  return (
    <StyledBoard>
      <BoardInfo activeGroup="Wybrana grupa" activeBoard="Wybrana tablica" />
      <Tasks />
    </StyledBoard>
  )
}

export { Board }
