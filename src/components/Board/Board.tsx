import styled from 'styled-components'

const StyledBoard = styled.div`
  grid-column: 4/13;
  padding: 1rem;
`

const Board: React.FC = () => {
  return <StyledBoard>Board</StyledBoard>
}

export { Board }
