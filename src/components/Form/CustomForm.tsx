import React from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const StyledInput = styled.input`
  padding: 1rem;

  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 0.5rem;
  outline: none;
`

const StyledSelect = styled.select`
  padding: 1rem;

  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 0.5rem;
  outline: none;
`

const StyledInputButton = styled.input`
  padding: 1rem;

  background-color: ${({ theme }) => theme.colors.gray200};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 0.5rem;
  outline: none;
`

const StyledErrorMessage = styled.p`
  font-size: 0.8rem;
  color: #dd1d1d;
`

export interface FormFieldSelectOption {
  value: string
  textContent: string
}
export interface FormField {
  name: string
  type: string
  options?: FormFieldSelectOption[]
  placeholder?: string
  validation?: object
}

interface CustomFormProps {
  fields: FormField[]
  onSubmit: (data: any) => void
  errors: any
  register: any
  submitButtonValue: string
}

export const CustomForm: React.FC<CustomFormProps> = ({
  fields,
  onSubmit,
  errors,
  register,
  submitButtonValue,
}) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      {fields.map((field, index) => {
        if (field.type === 'select') {
          return (
            <React.Fragment key={index}>
              <StyledSelect
                {...register(field.name, field.validation)}
                type={field.type}
                placeholder={field.placeholder}
              >
                {field.options &&
                  field.options.map((option) => (
                    <option value={option.value}>{option.textContent}</option>
                  ))}
              </StyledSelect>
              <StyledErrorMessage>
                {errors.groupName?.message}
              </StyledErrorMessage>
            </React.Fragment>
          )
        } else {
          return (
            <React.Fragment key={index}>
              <StyledInput
                {...register(field.name, field.validation)}
                type={field.type}
                placeholder={field.placeholder}
              />
              <StyledErrorMessage>
                {errors.groupName?.message}
              </StyledErrorMessage>
            </React.Fragment>
          )
        }
      })}

      <StyledInputButton type="submit" value={submitButtonValue} />
    </StyledForm>
  )
}
