import React from 'react'
import styled, { css } from 'styled-components'

export interface IImageHolder {
  query: string
  url?: string
  isError?: boolean
}

const ImageHolder = ({url = '', query = '', isError = false}: IImageHolder) => {
  return (
    <StyledSection isError={isError}>
      <h1>{query}</h1>
      {!isError && <StyledImage src={url} alt={query}/>}
    </StyledSection>
  )
}

export default ImageHolder

const StyledSection = styled.section<{isError: boolean}>`
  background: var(--color-white);
  white-space: break-spaces;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
  padding: var(--default-size);
  box-shadow: var(--shadow-default);
  border-radius: var(--default-size);
  margin: var(--default-size);
  ${({isError}) => isError && css`
    color: var(--color-red);
    justify-content: center;
    h1 {
      text-align: left;
    }
  `}
  max-width: 550px;
`

const StyledImage = styled.img`
  width: 512px;
  height: 512px;
`