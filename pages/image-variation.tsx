import Form from '@/components/Form'
import { useState, useEffect } from 'react'
import Loader from '@/components/Loader'
import styled from 'styled-components'
import Portal from '@/components/Portal'
import { scrollToElement } from '@/utils/elements'
import ImageHolder, { IImageHolder } from '../components/ImageHolder'
import { FormWrapperStyle } from '@/styles/styles'

export default function ImageVariation() {
  const [imageHolders, setImageHolders] = useState<IImageHolder[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: any) {
    setIsLoading(true)
    const formElements = e.target.elements
    const prompt = formElements['prompt'].value
    let imagesData: IImageHolder[] = []

    try {
      const response = await fetch('/api/imageVariation', {
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

      imagesData = [
        {
          url: data.data[0],
          isError: false,
        },
        {
          url: data.data[1],
          isError: false,
        },
      ]
    } catch (error: any) {
      imagesData = [
        {
          query: `query: ${prompt}\nerror: ${error.message}`,
          isError: true,
        },
      ]
    } finally {
      setIsLoading(false)
      setImageHolders([...imageHolders, ...imagesData])
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
      <StyledFormWrapper>
        <Form
          onFormSubmit={onSubmit}
          disabled={isLoading}
          submitLabel={'Make image variation'}
          instructions={'Please provide an image URL with square dimensions and image size lower than 4MB'}
        />
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
            <ImageHolder
              key={index}
              url={imageHolder.url}
              query={imageHolder.isError ? imageHolder.query : undefined}
              isError={imageHolder.isError}
            />
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
  position: absolute;
  left: 50%;
  top: 50%;
`
