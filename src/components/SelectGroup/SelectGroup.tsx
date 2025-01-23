import styled from 'styled-components'
import { IoIosArrowDown } from 'react-icons/io'
import { Action, Groups } from '../../App'
import { NewGroupButton } from '../NewGroupButton'
import { SidebarSectionTitle } from '../SidebarSectionTitle'
import { EditGroupsButton } from '../EditGroupsButton'

const StyledSelectWrapper = styled.div`
  position: relative;
`

const StyledSelect = styled.select`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
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
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'select_group', payload: e.target.value })
  }

  return (
    <>
      <SidebarSectionTitle title="Grupy">
        <NewGroupButton dispatch={dispatch} />
        <EditGroupsButton dispatch={dispatch} groups={groups} />
      </SidebarSectionTitle>

      <StyledSelectWrapper>
        <StyledSelect onChange={handleSelectChange}>
          {groups.map((group) => (
            <option key={group.groupId} value={group.groupId}>
              {group.grupIcon} {group.groupName}
            </option>
          ))}
        </StyledSelect>
        <StyledArrowDown />
      </StyledSelectWrapper>
    </>
  )
}

export { SelectGroup }
