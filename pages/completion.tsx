import Form from '@/components/Form'
import { useState, useEffect } from 'react';
import Loader from '@/components/Loader';
import Ticket, { ITicket } from '@/components/Ticket';
import styled from 'styled-components';
import Portal from '@/components/Portal';
import { scrollToElement } from '@/utils/elements';
import { FormWrapperStyle } from '@/styles/styles';

const TOGGLE_INPUT = {
  optionLeft: "Probability Temp",
  optionRight: "Creativity Temp"
}

export default function Completion() {
  const [tickets, setTickets] = useState<ITicket[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: any) {
    setIsLoading(true)
    const formElements = e.target.elements
    const prompt = formElements['prompt'].value
    const isCreativityTemp = e.target.elements['toggle'].checked
    let ticketData = {
      answer: '', 
      question: '', 
      isError: false
    }

    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, isCreativityTemp }),
      });
      const data = await response.json();

      if (response.status === 500) {
        throw new Error(data.error.message)
      }

      ticketData = {
        answer: data.result, 
        question: prompt, 
        isError: false
      }
    } catch (error: any) {
      ticketData = {
        answer: error.message, 
        question: 'Error occurred during the request to openAI', 
        isError: true
      }
    } finally {
      setIsLoading(false)
      setTickets([...tickets, ticketData])
    }
  }

  useEffect(() => {
    if (isLoading) {
      return
    }

    const elementForScroll = document.querySelector('#tickets > section:last-child')
    scrollToElement(elementForScroll)
  }, [isLoading])

  return (
    <>
      <StyledFormWrapper>
        <Form 
          onFormSubmit={onSubmit} 
          disabled={isLoading} 
          toggleInput={TOGGLE_INPUT} 
          submitLabel={'Get Answer'}/>
      </StyledFormWrapper>
      {isLoading && 
        <Portal>
          <StyledLoaderWrapper>
            <Loader/>
          </StyledLoaderWrapper>
        </Portal>}
      {tickets.length > 0 && 
        <StyledTicketsWrapper id="tickets">
          { tickets.map((ticket: ITicket, index: number) => 
            <Ticket 
              key={index} 
              question={ticket.question} 
              answer={ticket.answer} 
              isError={ticket.isError}/>
          )}
        </StyledTicketsWrapper>
      }
    </>
  )
}

const StyledTicketsWrapper = styled.main`
  padding: var(--padding-space-header) 3rem 3rem 3rem;
`

const StyledFormWrapper = styled.section`
  ${FormWrapperStyle}
`

const StyledLoaderWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
`
