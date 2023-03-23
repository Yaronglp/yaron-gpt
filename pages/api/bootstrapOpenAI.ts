import { Configuration, OpenAIApi } from 'openai'

let openAIInstance: any = null

export const getOpenAIApi = (apiKey?: string) => {
  if (openAIInstance) {
    return openAIInstance
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY || apiKey,
  })

  openAIInstance = new OpenAIApi(configuration)

  return openAIInstance
}
