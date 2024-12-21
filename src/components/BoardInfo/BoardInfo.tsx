import styled from 'styled-components'

const StyledBoardInfo = styled.div`
  padding: 1rem 0;
`

const StyledActiveBoardTitle = styled.p`
  font-weight: 300;
`

interface BoardInfoProps {
  activeGroup: string
  activeBoard: string
}

const BoardInfo: React.FC<BoardInfoProps> = ({ activeGroup, activeBoard }) => {
  return (
    <StyledBoardInfo>
      <h2>{activeGroup}</h2>
      <StyledActiveBoardTitle>{activeBoard}</StyledActiveBoardTitle>
    </StyledBoardInfo>
  )
}

export { BoardInfo }
