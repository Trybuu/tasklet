import styled from 'styled-components'
import { BoardInfo } from '../BoardInfo'
import { Tasks } from '../Tasks/Tasks'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Action, Todos } from '../../App'
import { Value } from 'react-calendar/src/shared/types.js'

const StyledBoard = styled.section`
  grid-column: 1/13;
  padding: 1rem;

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
interface BoardProps {
  activeGroupName: string
  activeBoardName: string
  activeTasks: Todos | undefined
  date: Date | Value
  dispatch: React.Dispatch<Action>
}

const Board: React.FC<BoardProps> = ({
  activeGroupName,
  activeBoardName,
  activeTasks,
  date,
  dispatch,
}) => {
  return (
    <StyledBoard>
      <BoardInfo
        activeGroup={activeGroupName}
        activeBoard={activeBoardName}
        date={date}
      />
      <DndProvider backend={HTML5Backend}>
        <Tasks tasks={activeTasks} dispatch={dispatch} />
      </DndProvider>
    </StyledBoard>
  )
}

export { Board }
