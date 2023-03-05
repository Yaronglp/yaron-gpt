import { addQuestionMark, capitalization } from '@/utils/manipulation'
import React from 'react'
import styled, { css } from 'styled-components'

export interface ITicket {
  question: string
  answer: string
  isError?: boolean
}

const Ticket = ({ question = '', answer = '', isError = false }: ITicket) => {
  const normalizedQuestion = isError ? question : addQuestionMark(capitalization(question.trim()))

  return (
    <StyledSection isError={isError}>
      <StyledParagraph>{normalizedQuestion}</StyledParagraph>
      <StyledAnswer>{answer.trim()}</StyledAnswer>
    </StyledSection>
  )
}

export default Ticket

const StyledParagraph = styled.p`
  flex: 1;
`

const StyledSection = styled.section<{ isError: boolean }>`
  background: var(--color-white);
  display: flex;
  gap: 2rem;
  flex-direction: row;
  justify-content: space-evenly;
  padding: var(--size-regular);
  box-shadow: var(--shadow-default);
  border-radius: var(--size-regular);
  line-height: 1.2rem;
  margin: var(--size-regular);
  ${({ isError }) =>
    isError &&
    css`
      color: var(--color-red);
    `}

  &:nth-child(n+2):last-child {
    font-size: larger;
    position: relative;

    &::before {
      content: url('./point-right.svg');
      position: absolute;
      left: -3rem;
    }
  }
`

const StyledAnswer = styled(StyledParagraph)`
  white-space: pre-line;
  flex: 4;
`
