import { NextApiRequest, NextApiResponse } from 'next'
import { getOpenAIApi } from './bootstrapOpenAI'

const MAX_TOKENS_QUERY = 1000
const GENERAL_ERROR = 'An error occurred, please try again later'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const temperature = req.body.isCreativityTemp ? 0.7 : 0.3
  try {
    const completion = await getOpenAIApi().createCompletion({
      model: 'text-davinci-003',
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
