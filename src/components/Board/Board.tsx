import styled from 'styled-components'
import { BoardInfo } from '../BoardInfo'
import { Tasks } from '../Tasks/Tasks'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Todos } from '../../App'

const StyledBoard = styled.section`
  grid-column: 3/13;
`
interface BoardProps {
  activeGroupName: string
  activeBoardName: string
  activeTasks: Todos | undefined
}

const Board: React.FC<BoardProps> = ({
  activeGroupName,
  activeBoardName,
  activeTasks,
}) => {
  return (
    <StyledBoard>
      <BoardInfo activeGroup={activeGroupName} activeBoard={activeBoardName} />
      <DndProvider backend={HTML5Backend}>
        <Tasks tasks={activeTasks} />
      </DndProvider>
    </StyledBoard>
  )
}

export { Board }
