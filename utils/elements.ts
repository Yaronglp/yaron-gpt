export const scrollToElement = (element: Element | null) => {
  if (!element) {
    return
  }

  element.scrollIntoView({behavior: "smooth"});
}
