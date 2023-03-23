import { Configuration, OpenAIApi } from 'openai'
import { isEmptyString } from '@/utils/validation'

let openAIInstance: any = null
let apiKeyFromStorage: string = ''

const createOpenAIInstance = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY || apiKeyFromStorage,
  })

  openAIInstance = new OpenAIApi(configuration)
}

export const getOpenAIApi = (apiKey: string) => {
  const isAPIKeyChanged = !isEmptyString(apiKey) && apiKey !== apiKeyFromStorage
  const isAIInstanceShouldBeUse = openAIInstance && !isAPIKeyChanged

  if (isAIInstanceShouldBeUse) {
    return openAIInstance
  }

  apiKeyFromStorage = apiKey || ''
  createOpenAIInstance()

  return openAIInstance
}
