import React from 'react'
import styled from 'styled-components'

interface IToggleSwitcher {
  optionLeft: string
  optionRight: string
}

const ToggleSwitcher = ({optionLeft = "opt1", optionRight = "opt2"}: IToggleSwitcher) => {
  return (
    <StyledToggleWrapper>
      <span>{optionLeft}</span>
      <StyledInputWrapper>
        <StyledInput type="checkbox" name="toggle"/>
      </StyledInputWrapper>
      <span>{optionRight}</span>
    </StyledToggleWrapper>
  )
}

export default ToggleSwitcher

const StyledToggleWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledInputWrapper = styled.div`
  padding: 0.5rem;
`

const StyledInput = styled.input`
  appearance: none;
  position: relative;
  width: 3.5rem;
  height: 2rem;
  border-radius: var(--default-size);
  background-color: var(--color-purple);
  transition: background .5s;
  outline: none;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    height: 1.25rem;
    width: 1.25rem;
    background-color: var(--color-white);
    transition: left .5s;
  }


  &:checked {
    background-color: var(--color-orange);

    &::after {
      left: 70%;
    }
  }
`
