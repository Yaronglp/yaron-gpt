import { ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const PORTAL_ID = '#portal'

interface IPortal {
  children: ReactNode
}

const Portal = ({children}: IPortal) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>(PORTAL_ID)
    setMounted(true)
  }, [])

  return (mounted && ref.current) ? createPortal(children, ref.current) : null
}

export default Portal