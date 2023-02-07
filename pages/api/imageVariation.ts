import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
const fs = require('fs')
const request = require('request')
const sharp = require('sharp')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const GENERAL_ERROR = 'Something went wrong with the request for the image variation generator'
const LOCAL_IMAGE_PATH = './image.png'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body

  request.get(prompt).on('response', function (response: any) {
    response.pipe(sharp().png()).pipe(fs.createWriteStream(LOCAL_IMAGE_PATH))
  })

  try {
    const response = await openai.createImageVariation(fs.createReadStream('image.png'), 2, '512x512')

    console.log(response)

    const imageURLs = [response.data.data[0].url, response.data.data[1].url]

    res.status(200).json({
      succuss: true,
      data: imageURLs,
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
