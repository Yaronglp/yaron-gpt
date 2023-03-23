const OPEN_AI_KEY = 'OPEN_AI_KEY'

export const getOpenAIKey = (): string => {
  return localStorage.getItem(OPEN_AI_KEY) || ''
}

export const setOpenAIKey = (inputKey: string) => {
  localStorage.setItem(OPEN_AI_KEY, inputKey)
}
