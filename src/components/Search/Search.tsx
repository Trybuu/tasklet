import { useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import styled from 'styled-components'

const SearchContainer = styled.div`
  display: flex;
`

const SearchInput = styled.input<{ $isExpanded: boolean }>`
  position: relative;
  width: 100%;
  padding: 1rem;

  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-right: none;
  border-radius: 0.5rem 0 0 0.5rem;
  outline: none;
  z-index: 1;
  opacity: ${({ $isExpanded }) => ($isExpanded ? '1' : '0')};
  pointer-events: ${({ $isExpanded }) => ($isExpanded ? 'auto' : 'none')};
  transform: ${({ $isExpanded }) => ($isExpanded ? 'scaleX(1)' : 'scaleX(0)')};
  transform-origin: right;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
`

const SearchButton = styled.button<{ $isExpanded: boolean }>`
  padding: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ $isExpanded }) =>
    $isExpanded ? '0 .5rem .5rem 0' : '.5rem'};
  cursor: pointer;
`

export const Search: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleOnClick() {
    if (isExpanded) {
      setIsExpanded(false)
    } else {
      setIsExpanded(true)

      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  return (
    <SearchContainer>
      <SearchInput type="text" ref={inputRef} $isExpanded={isExpanded} />
      <SearchButton
        onClick={handleOnClick}
        $isExpanded={isExpanded}
        aria-label="search-button"
      >
        <FiSearch />
      </SearchButton>
    </SearchContainer>
  )
}
