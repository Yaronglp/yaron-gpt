import { isEmptyString } from '@/utils/validation'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import ToggleSwitcher from './toggleSwitcher'

interface IForm {
  onFormSubmit: (e: any) => void
  disabled: boolean
}

const Form = ({ onFormSubmit, disabled}: IForm) => {
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
        placeholder="I would like to know..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <ToggleSwitcher optionLeft="Probability Temp" optionRight="Creativity Temp"/>
      <StyledInputSubmit type="submit" value="Get Answer" disabled={isEmptyString(input)}/>
    </StyledForm>
  )
}

export default Form

const StyledForm = styled.form<{disabled: boolean}>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: var(--default-size);
  background: var(--color-white);
  padding: var(--padding-space-big);
  box-shadow: 0 0 0.5rem;
  border-radius: 3rem;
  ${({disabled}) => disabled && css`
    opacity: 0.3;
    pointer-events: none;
  `}
`

const StyledInput = styled.input`
  padding: var(--padding-space-small);
  border-radius: var(--default-size);
  border-color: transparent;
  font-size: var(--default-size);
  box-shadow: var(--shadow-default);

  &:focus-visible {
    outline: none
  }
`

const StyledInputPrompt = styled(StyledInput)`
  width: 40rem;
`

const StyledInputSubmit = styled(StyledInput)`
  ${({ disabled }) => !disabled && css`
    cursor: pointer;
  `}
`

