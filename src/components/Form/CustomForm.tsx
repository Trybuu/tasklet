import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
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

const StyledEmojiPicker = styled(EmojiPicker)`
  width: 200px;
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

type Option = {
  value: string
  textContent: string
}

interface Field {
  name: string
  type: string
  options?: Option[]
  placeholder?: string
  validation?: any
}

interface CustomFormProps {
  fields: Field[]
  onSubmit: (data: any) => void
  submitButtonValue: string
}

export const CustomForm: React.FC<CustomFormProps> = ({
  fields,
  onSubmit,
  submitButtonValue,
}) => {
  const [isEmojiPickerActive, setIsEmojiPickerActive] = useState(false)
  const [emojiValue, setEmojiValue] = useState('')
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext()

  const handleEmojiPick = (emoji: EmojiClickData) => {
    setEmojiValue(emoji.emoji)
    setValue('icon', emoji.emoji)
    setIsEmojiPickerActive(false)
  }

  console.log(fields)

  console.log('BŁĘDY Z CUSTOM FORM')
  console.log(errors)

  return (
    <StyledForm onSubmit={onSubmit}>
      {fields.map((field, index) => (
        <React.Fragment key={index}>
          {field.type === 'select' && (
            <>
              <StyledSelect {...register(field.name, field.validation)}>
                {field.options?.map((option, idx) => (
                  <option value={option.value} key={idx}>
                    {option.textContent}
                  </option>
                ))}
              </StyledSelect>
              <StyledErrorMessage>
                {errors[field.name]?.message?.toString()}
              </StyledErrorMessage>
            </>
          )}

          {field.type === 'emoji' && (
            <>
              <StyledInput
                placeholder={field.placeholder}
                onClick={() => setIsEmojiPickerActive(true)}
                value={emojiValue}
                readOnly
              />
              {isEmojiPickerActive && (
                <StyledEmojiPicker onEmojiClick={handleEmojiPick} />
              )}
              <StyledErrorMessage>
                {errors[field.name]?.message?.toString()}
              </StyledErrorMessage>
            </>
          )}

          {field.type === 'text' && (
            <>
              <StyledInput
                {...register(field.name, field.validation)}
                placeholder={field.placeholder}
              />
              <StyledErrorMessage>
                {errors[field.name]?.message?.toString()}
              </StyledErrorMessage>
            </>
          )}
        </React.Fragment>
      ))}

      <StyledInputButton type="submit" value={submitButtonValue} />
    </StyledForm>
  )
}
