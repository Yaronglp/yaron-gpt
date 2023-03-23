import { Configuration, OpenAIApi } from 'openai'

let openAIInstance: any = null
let apiKeyFromStorage: string = ''

const createOpenAIInstance = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY || apiKeyFromStorage,
  })

  openAIInstance = new OpenAIApi(configuration)

  return openAIInstance
}

export const getOpenAIApi = (apiKey?: string) => {
  if (openAIInstance) {
    return openAIInstance
  }

  apiKeyFromStorage = apiKey || ''
  createOpenAIInstance()
}
