import { NextApiRequest, NextApiResponse } from 'next'
import { getOpenAIApi } from './bootstrapOpenAI'

const GENERAL_ERROR = 'Something went wrong with the request for the image generator'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body

  try {
    const response = await getOpenAIApi(req.body.token).createImage({
      prompt,
      n: 1,
      size: '512x512',
    })

    const imageURL = response.data.data[0].url

    res.status(200).json({
      succuss: true,
      data: imageURL,
    })
  } catch (err: any) {
    const errorRes = err.response
    if (errorRes) {
      res.status(500).json(errorRes.data)
    } else {
      console.log(err.message)
    }

    res.status(500).json({
      error: {
        message: GENERAL_ERROR,
      },
    })
  }
}
