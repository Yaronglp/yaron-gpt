import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const BackButton = () => {
  return (
    <Link href="/">
      <StyledButton>Back to Home Page</StyledButton>
    </Link>
  )
}

export default BackButton

const StyledButton = styled.button`
  position: absolute;
  padding: var(--size-regular);
  box-shadow: var(--shadow-default);
  border-radius: var(--size-regular);
  border-color: transparent;
  font-size: var(--size-regular);
  top: var(--size-big);
  left: var(--size-big);
  cursor: pointer;
`
