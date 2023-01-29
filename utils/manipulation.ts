import { isEmptyString } from './validation'

const QUESTION_MARK = '?'

export const capitalization = (str: string) => {
  if (isEmptyString(str)) {
    return str
  }

  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export const addQuestionMark = (str: string) => {
  const lastChar = str.slice(-1)
  
  if (lastChar === QUESTION_MARK) {
    return str
  }

  return `${str}${QUESTION_MARK}`
}
