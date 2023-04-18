import { NextApiRequest, NextApiResponse } from 'next'
import { getOpenAIApi } from './bootstrapOpenAI'

const MAX_TOKENS_QUERY = 512
const GENERAL_ERROR = 'An error occurred, please try again later'
const MODEL = 'text-davinci-003'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const temperature = req.body.isCreativityTemp ? 0.8 : 0.2
  try {
    const completion = await getOpenAIApi(req.body.token).createCompletion({
      model: MODEL,
      prompt: req.body.prompt,
      temperature,
      max_tokens: MAX_TOKENS_QUERY,
    })

    res.status(200).json({ result: completion.data.choices[0].text })
  } catch (error: any) {
    const errorRes = error.response
    if (errorRes) {
      res.status(500).json(errorRes.data)
    }

    res.status(500).json({
      error: {
        message: GENERAL_ERROR,
      },
    })
  }
}
