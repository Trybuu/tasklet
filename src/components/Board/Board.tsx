import styled from 'styled-components'
import { BoardInfo } from '../BoardInfo'

const StyledBoard = styled.div`
  grid-column: 4/13;
`

const Board: React.FC = () => {
  return (
    <StyledBoard>
      <BoardInfo activeGroup="Wybrana grupa" activeBoard="Wybrana tablica" />
      <section id="section-tasks-planned"></section>
      <section id="section-tasks-in-progress"></section>
      <section id="section-tasks-completed"></section>
    </StyledBoard>
  )
}

export { Board }
