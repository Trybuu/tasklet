import styled from 'styled-components'
import { IoIosArrowDown } from 'react-icons/io'
import { Action, Groups } from '../../App'
import { Modal } from '../Modal'
import { useState } from 'react'

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

interface SelectGroupProps {
  groups: Groups
  dispatch: React.Dispatch<Action>
}

const SelectGroup: React.FC<SelectGroupProps> = ({ groups, dispatch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'add_group') {
      console.log('Dodaj Grupę!')
      setIsModalOpen(true)
      // dispatch({ type: 'select_group', payload: e.target.value })
    } else if (isModalOpen) {
      setIsModalOpen(false)
    } else {
      console.log(e.target.value)
      dispatch({ type: 'select_group', payload: e.target.value })
    }
  }

  return (
    <>
      <h3>Grupy</h3>
      <StyledSelectWrapper>
        <StyledSelect onChange={handleSelectChange}>
          {groups.map((group) => (
            <option key={group.groupId} value={group.groupId}>
              {group.grupIcon} {group.groupName}
            </option>
          ))}

          <option value="add_group">➕ Dodaj grupę</option>
        </StyledSelect>
        <StyledArrowDown />
      </StyledSelectWrapper>

      <Modal open={isModalOpen}>
        <h2>Modal</h2>
      </Modal>
    </>
  )
}

export { SelectGroup }
