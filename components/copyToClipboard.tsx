import { useState } from 'react'
import styled from 'styled-components'

interface ICopyToClipboard {
  text: string
  className?: string
}

const CopyToClipboard = ({ text, className }: ICopyToClipboard) => {
  const [isCopied, setIsCopied] = useState(false)

  const onButtonClick = () => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
  }

  return (
    <StyledContainer className={className}>
      {isCopied ? (
        <StyledLabel>Text copied to clipboard!</StyledLabel>
      ) : (
        <StyledButton onClick={onButtonClick}>
          <StyledImg src="./clipboard.svg" alt="clipboard" />
          Copy
        </StyledButton>
      )}
    </StyledContainer>
  )
}

export default CopyToClipboard

const StyledContainer = styled.div`
  padding: var(--size-small);
`

const StyledButton = styled.div`
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  font-size: var(--size-regular);

  &:focus-visible {
    outline: none;
  }
`

const StyledImg = styled.img`
  width: var(--size-regular);
  height: var(--size-regular);
  margin: 0 var(--size-small);
`

const StyledLabel = styled.label`
  font-size: var(--size-regular);
`
