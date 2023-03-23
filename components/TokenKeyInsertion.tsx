import { setOpenAIKey } from '@/utils/storage'
import { isEmptyString } from '@/utils/validation'
import { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

const TokenKeyInsertion = ({ className }: { className?: string }) => {
  const [input, setInput] = useState<string>('')
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const saveKeyHandler = () => {
    setOpenAIKey(input)
    setIsExpanded(false)
    setInput('')
  }

  const containerExpandedHandler = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <section className={className}>
      {isExpanded ? (
        <StyledInputContainer>
          <StyledInput
            type="text"
            name="prompt"
            placeholder="Open AI Key"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <StyledButton disabled={isEmptyString(input)} onClick={saveKeyHandler}>
            Save
          </StyledButton>
          <StyledButton onClick={containerExpandedHandler}>Cancel</StyledButton>
        </StyledInputContainer>
      ) : (
        <StyledButtonExpand onClick={containerExpandedHandler}>Insert OpenAI key</StyledButtonExpand>
      )}
    </section>
  )
}

export default TokenKeyInsertion

const SlideIn = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`

const StyledInputContainer = styled.p`
  background: var(--color-white);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: var(--size-regular);
  box-shadow: var(--shadow-default);
  border-radius: var(--size-regular);
  line-height: 1.2rem;
  width: 34rem;
  animation: ${SlideIn} 1s forwards;
`

const ButtonDefault = styled.button`
  padding: var(--size-small);
  border-radius: var(--size-regular);
  border-color: transparent;
  font-size: var(--size-regular);
  box-shadow: var(--shadow-default);
  ${({ disabled }) =>
    !disabled &&
    css`
      cursor: pointer;
    `}

  &:focus-visible {
    outline: none;
  }
`

const StyledInput = styled.input`
  padding: var(--size-small);
  border-radius: var(--size-regular);
  border-color: transparent;
  font-size: var(--size-regular);
  box-shadow: var(--shadow-default);
  width: 20rem;

  &:focus-visible {
    outline: none;
  }
`

const StyledButton = styled(ButtonDefault)`
  width: 5rem;
`

const StyledButtonExpand = styled(ButtonDefault)`
  width: 12rem;
`
