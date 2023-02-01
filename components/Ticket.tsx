import { addQuestionMark, capitalization } from '@/utils/manipulation'
import React from 'react'
import styled, { css } from 'styled-components'

export interface ITicket {
  question: string
  answer: string
  isError?: boolean
}

const Ticket = ({question = '', answer = '', isError = false}: ITicket) => {
  const normalizedQuestion = isError ? question : addQuestionMark(capitalization(question.trim()))

  return (
    <StyledSection isError={isError}>
      <StyledDiv>{normalizedQuestion}</StyledDiv>
      <StyledAnswer>{answer.trim()}</StyledAnswer>
    </StyledSection>
  )
}

export default Ticket

const StyledDiv = styled.div`
  flex: 1;
`

const StyledSection = styled.section<{isError: boolean}>`
  background: var(--color-white);
  display: flex;
  gap: 2rem;
  flex-direction: row;
  justify-content: space-evenly;
  padding: var(--default-size);
  box-shadow: var(--shadow-default);
  border-radius: var(--default-size);
  line-height: 1.2rem;
  margin: var(--default-size);
  ${({isError}) => isError && css`
    color: var(--color-red);
  `}

  &:nth-child(n+2):last-child {
    font-size: larger;
    position: relative;

    &::before {
      content: url('./point-right.svg');
      position: relative;
      left: -3rem;
    }
  }
`

const StyledAnswer = styled(StyledDiv)`
  white-space: pre-line;
  flex: 4;
`