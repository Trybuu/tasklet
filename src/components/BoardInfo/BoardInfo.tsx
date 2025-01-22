import styled from 'styled-components'
import { formatDate } from '../../utils/formatDate'
import { Value } from 'react-calendar/src/shared/types.js'

const StyledBoardInfo = styled.header`
  padding: 1rem 0;
`

const StyledActiveBoardTitle = styled.p`
  font-weight: 300;
`

interface BoardInfoProps {
  activeGroup: string
  activeBoard: string
  date: Date | Value
}

const BoardInfo: React.FC<BoardInfoProps> = ({
  activeGroup,
  activeBoard,
  date,
}) => {
  return (
    <StyledBoardInfo>
      <h1>{formatDate(date)}</h1>
      <h2>{activeGroup}</h2>
      <StyledActiveBoardTitle>{activeBoard}</StyledActiveBoardTitle>
    </StyledBoardInfo>
  )
}

export { BoardInfo }
