import Form from '@/components/Form'
import { useState, useEffect } from 'react'
import Loader from '@/components/Loader'
import styled from 'styled-components'
import Portal from '@/components/Portal'
import { scrollToElement } from '@/utils/elements'
import ImageHolder, { IImageHolder } from '../components/ImageHolder'
import BackButton from '@/components/BackButton'
import { FormWrapperStyle, LoaderWrapperStyle } from '@/styles/common'

export default function ImageCreation() {
  const [imageHolders, setImageHolders] = useState<IImageHolder[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: any) {
    setIsLoading(true)
    const formElements = e.target.elements
    const prompt = formElements['prompt'].value
    let imageData: IImageHolder = {
      query: '',
      isError: false,
    }

    try {
      const response = await fetch('/api/imageCreation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
      const data = await response.json()

      if (response.status === 500) {
        throw new Error(data.error.message)
      }

      imageData = {
        url: data.data,
        query: prompt,
        isError: false,
      }
    } catch (error: any) {
      imageData = {
        query: `query: ${prompt}\nerror: ${error.message}`,
        isError: true,
      }
    } finally {
      setIsLoading(false)
      setImageHolders([...imageHolders, imageData])
    }
  }

  useEffect(() => {
    if (isLoading) {
      return
    }

    const elementForScroll = document.querySelector('#image-holders > section:last-child')
    scrollToElement(elementForScroll)
  }, [isLoading])

  return (
    <>
      <BackButton />
      <StyledFormWrapper>
        <Form onFormSubmit={onSubmit} disabled={isLoading} submitLabel={'Generate image'} />
      </StyledFormWrapper>
      {isLoading && (
        <Portal>
          <StyledLoaderWrapper>
            <Loader />
          </StyledLoaderWrapper>
        </Portal>
      )}
      {imageHolders.length > 0 && (
        <StyledImageWrapper id="image-holders">
          {imageHolders.map((imageHolder: IImageHolder, index: number) => (
            <ImageHolder key={index} url={imageHolder.url} query={imageHolder.query} isError={imageHolder.isError} />
          ))}
        </StyledImageWrapper>
      )}
    </>
  )
}

const StyledImageWrapper = styled.main`
  display: flex;
  justify-content: center;
  padding-top: var(--padding-space-header);
  flex-wrap: wrap;

  h1 {
    text-align: center;
  }
`

const StyledFormWrapper = styled.section`
  ${FormWrapperStyle}
`

const StyledLoaderWrapper = styled.div`
  ${LoaderWrapperStyle}
`
