import React from 'react'
import styled, { css } from 'styled-components'

export interface IImageHolder {
  query?: string
  url?: string
  isError?: boolean
}

const ImageHolder = ({ url = '', query = '', isError = false }: IImageHolder) => {
  return (
    <StyledSection isError={isError}>
      {query && <h1>{query}</h1>}
      {!isError && <StyledImage src={url} alt={query} />}
    </StyledSection>
  )
}

export default ImageHolder

const StyledSection = styled.section<{ isError: boolean }>`
  background: var(--color-white);
  white-space: break-spaces;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
  padding: var(--size-regular);
  box-shadow: var(--shadow-default);
  border-radius: var(--size-regular);
  margin: var(--size-regular);
  ${({ isError }) =>
    isError &&
    css`
      color: var(--color-red);
      justify-content: center;
      h1 {
        text-align: left;
      }
    `}
  max-width: 550px;

  h1 {
    max-width: 100%;
    word-wrap: break-word;
  }
`

const StyledImage = styled.img`
  width: 512px;
  height: 512px;
`
