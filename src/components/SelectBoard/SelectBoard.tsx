import styled from 'styled-components'

const SelectBoardWrapper = styled.div``

const SelectBoardList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0;
`

const SelectBoardListElement = styled.li`
  padding: 1rem;
  /* background-color: white; */
  border-radius: 0.5rem;
`

const SelectBoard: React.FC = () => {
  return (
    <SelectBoardWrapper>
      <h3>Tablice</h3>
      <SelectBoardList>
        <SelectBoardListElement>✅ Zadania główne</SelectBoardListElement>
        <SelectBoardListElement>🤝 Spotkania</SelectBoardListElement>
      </SelectBoardList>
    </SelectBoardWrapper>
  )
}

export { SelectBoard }
