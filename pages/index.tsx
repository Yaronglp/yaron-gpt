import styled from 'styled-components'
import Link from 'next/link'

interface ILinks {
  urlPath: string
  label: string
}

const LINKS: ILinks[] = [
  {
    urlPath: '/completion',
    label: 'Ask AI',
  },
  {
    urlPath: '/image-creation',
    label: 'Generate Image from Text',
  },
  {
    urlPath: '/image-variation',
    label: 'Generate Variations from Image',
  },
]

export default function Home() {
  return (
    <StyledWrapper>
      {LINKS.map((link) => (
        <section key={link.label}>
          <Link href={link.urlPath}>{link.label}</Link>
        </section>
      ))}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 6rem;

  a {
    background: var(--color-white);
    box-shadow: var(--shadow-default);
    border-radius: var(--size-regular);
    padding: var(--size-big);
    width: 20rem;
    height: 12rem;
    font-size: 2rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      font-weight: 700;
    }
  }
`
