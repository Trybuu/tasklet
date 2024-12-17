import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import styled from 'styled-components'

const SearchContainer = styled.div`
  display: flex;
  overflow: hidden;
`

const SearchInput = styled.input<{ $isExpanded: boolean }>`
  position: relative;
  top: 0;
  left: ${({ $isExpanded }) => ($isExpanded ? '0' : '100%')};
  padding: 1rem;
  border: none;
  border-radius: 0.5rem 0 0 0.5rem;
  outline: none;
  z-index: 1;
`

const SearchButton = styled.button<{ $isExpanded: boolean }>`
  padding: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray};
  background: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ $isExpanded }) =>
    $isExpanded ? '0 .5rem .5rem 0' : '.5rem'};
  z-index: 10;
  cursor: pointer;
`

export const Search: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  function handleOnClick() {
    if (isExpanded) setIsExpanded(false)
    else setIsExpanded(true)
  }

  return (
    <SearchContainer>
      <SearchInput type="text" $isExpanded={isExpanded} />
      <SearchButton onClick={handleOnClick} $isExpanded={isExpanded}>
        <FiSearch />
      </SearchButton>
    </SearchContainer>
  )
}
