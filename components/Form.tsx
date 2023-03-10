import { isEmptyString } from '@/utils/validation'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import ToggleSwitcher from './toggleSwitcher'

interface IForm {
  onFormSubmit: (e: any) => void
  disabled: boolean
  submitLabel: string
  toggleInput?: { optionLeft: string; optionRight: string }
  instructions?: string
}

const Form = ({ onFormSubmit, disabled, submitLabel, toggleInput, instructions }: IForm) => {
  const [input, setInput] = useState<string>('')

  const resetForm = () => {
    setInput('')
  }

  const onSubmit = async (e: any) => {
    if (isEmptyString(input)) {
      return
    }

    e.preventDefault()
    await onFormSubmit(e)
    resetForm()
  }

  return (
    <StyledForm onSubmit={onSubmit} disabled={disabled}>
      <StyledInputPrompt
        type="text"
        name="prompt"
        placeholder="I would like to generate..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {toggleInput && <ToggleSwitcher optionLeft={toggleInput.optionLeft} optionRight={toggleInput.optionRight} />}
      {instructions && <label>{instructions}</label>}
      <StyledInputSubmit type="submit" value={submitLabel} disabled={isEmptyString(input)} />
    </StyledForm>
  )
}

export default Form

const StyledForm = styled.form<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: var(--size-regular);
  background: var(--color-white);
  padding: var(--size-big);
  box-shadow: 0 0 0.5rem;
  border-radius: 3rem;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.3;
      pointer-events: none;
    `}
`

const StyledInput = styled.input`
  padding: var(--size-small);
  border-radius: var(--size-regular);
  border-color: transparent;
  font-size: var(--size-regular);
  box-shadow: var(--shadow-default);

  &:focus-visible {
    outline: none;
  }
`

const StyledInputPrompt = styled(StyledInput)`
  width: 40rem;
`

const StyledInputSubmit = styled(StyledInput)`
  ${({ disabled }) =>
    !disabled &&
    css`
      cursor: pointer;
    `}
`
