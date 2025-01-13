import styled from 'styled-components'
import { formatDate } from '../../utils/formatDate'

const StyledBoardInfo = styled.header`
  padding: 1rem 0;
`

const StyledActiveBoardTitle = styled.p`
  font-weight: 300;
`

interface BoardInfoProps {
  activeGroup: string
  activeBoard: string
  date: Date
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
