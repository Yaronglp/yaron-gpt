import React from 'react'
import styled, { keyframes } from 'styled-components'

const Loader = () => {
  return <StyledLoader></StyledLoader>
}

export default Loader

const Spin = keyframes`
  0%   {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledLoader = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: var(--color-blue);
  border-bottom-color: var(--color-blue);
  animation: ${Spin} 3s linear infinite;

  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: var(--color-red);
    border-bottom-color: var(--color-red);
    animation: ${Spin} 4s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: var(--color-yellow);
    border-bottom-color: var(--color-yellow);
    animation: ${Spin} 5s linear infinite;
  }
`
