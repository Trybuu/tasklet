import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import React, { useState } from 'react'
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

interface ValidationRule {
  value: number
  message: string
}

interface FieldValidation {
  required?: boolean | string
  minLength?: ValidationRule
  maxLength?: ValidationRule
}

type Option = {
  value: string
  textContent: string
}
interface Field {
  name: string
  type: string
  options?: Option[]
  placeholder?: string
  validation?: FieldValidation
}

interface CustomFormProps {
  fields: Field[]
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
  const [isEmojiPickerActive, setIsEmojiPickerActive] = useState<boolean>(false)
  const [emojiValue, setEmojiValue] = useState<string>('')

  const handleOnClick = () => {
    setIsEmojiPickerActive(true)
  }

  const handleEmojiPick = (emoji: EmojiClickData) => {
    setEmojiValue(emoji.emoji)
  }

  return (
    <StyledForm onSubmit={onSubmit}>
      {fields.map((field, index) => {
        if (field.type === 'select') {
          return (
            <React.Fragment key={index}>
              <StyledSelect {...register(field.name, field.validation)}>
                {field.options?.map((option, idx) => (
                  <option value={option.value} key={idx}>
                    {option.textContent}
                  </option>
                ))}
              </StyledSelect>
              <StyledErrorMessage>
                {typeof errors[field.name]?.message === 'string' &&
                  errors[field.name]?.message}
              </StyledErrorMessage>
            </React.Fragment>
          )
        }

        if (field.type === 'emoji') {
          return (
            <React.Fragment key={index}>
              <StyledInput
                {...register(field.name, field.validation)}
                placeholder={field.placeholder}
                onClick={handleOnClick}
                value={emojiValue}
                readOnly
              />
              {isEmojiPickerActive && (
                <EmojiPicker onEmojiClick={handleEmojiPick} />
              )}
              <StyledErrorMessage>
                {typeof errors[field.name]?.message === 'string' &&
                  errors[field.name]?.message}
              </StyledErrorMessage>
            </React.Fragment>
          )
        }

        return (
          <React.Fragment key={index}>
            <StyledInput {...register(field.name, field.validation)} />
            <StyledErrorMessage>
              {typeof errors[field.name]?.message === 'string' &&
                errors[field.name]?.message}
            </StyledErrorMessage>
          </React.Fragment>
        )
      })}

      <StyledInputButton type="submit" value={submitButtonValue} />
    </StyledForm>
  )
}
