import { useState, useEffect, MouseEvent, RefObject } from "react"

type HandledMouseEvents = {
  mouseDown: boolean
  handleContextMenu: (ev: MouseEvent) => void
  handleMouseDown: (ev: MouseEvent) => void
  handleMouseReset: () => void
  handlePan: (ev: MouseEvent) => void
}

export default (
  docRef: RefObject<HTMLDivElement>,
  scale: number
): HandledMouseEvents => {
  const handleContextMenu = (ev: MouseEvent): void => {
    ev.preventDefault()
  }

  const [mouseDown, setMouseDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const handleMouseDown = (ev: MouseEvent): void => {
    if (scale <= 1) return
    setMouseDown(true)
    setStartX(ev.clientX)
    setStartY(ev.clientY)
  }

  const handleMouseReset = (): void => {
    if (mouseDown) {
      setMouseDown(false)
      setStartX(0)
      setStartY(0)
    }
  }

  // default is center (0.5 of width and height)
  const [scrollLeftRatio, setScrollLeftRatio] = useState(0.5)
  const [scrollTopRatio, setScrollTopRatio] = useState(0.5)
  const handlePan = (ev: MouseEvent): void => {
    if (!mouseDown || scale <= 1) return

    const containerElmt = docRef.current

    let deltaX = startX - ev.clientX
    let deltaY = startY - ev.clientY

    containerElmt.scroll(
      containerElmt.scrollLeft + deltaX,
      containerElmt.scrollTop + deltaY
    )

    setStartX(ev.clientX)
    setStartY(ev.clientY)

    if (docRef.current) {
      const {
        scrollLeft,
        scrollWidth,
        clientWidth,
        scrollTop,
        scrollHeight,
        clientHeight,
      } = docRef.current

      const scrollLeftMax = scrollWidth - clientWidth
      const scrollTopMax = scrollHeight - clientHeight

      setScrollLeftRatio(scrollLeft / scrollLeftMax)
      setScrollTopRatio(scrollTop / scrollTopMax)
    }
  }

  useEffect(() => {
    if (scale === 1) {
      setScrollLeftRatio(0.5)
      setScrollTopRatio(0.5)
    }

    const {
      scrollWidth,
      clientWidth,
      scrollHeight,
      clientHeight,
    } = docRef.current
    const scrollLeftMax = scrollWidth - clientWidth
    const scrollTopMax = scrollHeight - clientHeight

    docRef.current.scrollLeft = scrollLeftMax * scrollLeftRatio
    docRef.current.scrollTop = scrollTopMax * scrollTopRatio
  }, [scale])

  return {
    mouseDown,
    handleContextMenu,
    handleMouseDown,
    handleMouseReset,
    handlePan,
  }
}