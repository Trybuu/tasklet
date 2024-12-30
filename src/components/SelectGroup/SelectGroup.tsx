import styled from 'styled-components'
import { IoIosArrowDown } from 'react-icons/io'

const StyledSelectWrapper = styled.div`
  position: relative;
`

const StyledSelect = styled.select`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 0.5rem;

  /* Ukrycie domyślnej strzałki */
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
`

const StyledArrowDown = styled(IoIosArrowDown)`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  pointer-events: none; /* Nie przeszkadza w interakcji z select */
`

// interface SelectGroupProps {}

const SelectGroup: React.FC = () => {
  return (
    <StyledSelectWrapper>
      <StyledSelect>
        <option value="Przyjęcie urodzinowe">🎉 Przyjęcie urodzinowe</option>
      </StyledSelect>
      <StyledArrowDown />
    </StyledSelectWrapper>
  )
}

export { SelectGroup }
