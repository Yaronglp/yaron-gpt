import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
import axios from 'axios'
import Jimp from 'jimp'
const fs = require('fs')
// TODO: switch the CJS to ESM (including stream implementation)

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const GENERAL_ERROR = 'Something went wrong with the request for the image variation generator'
const IMAGE_FILENAME = 'image.png'
const LOCAL_IMAGE_PATH = `./${IMAGE_FILENAME}`

// TODO: Work on Error mechanism
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body

  await saveImageLocally(prompt)

  try {
    // TODO: make the image stream to be called sync - will solve the issue for the first image loading
    const response = await openai.createImageVariation(fs.createReadStream(LOCAL_IMAGE_PATH), 2, '512x512')
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
      console.error(err.message)
    }

    res.status(500).json({
      error: {
        message: GENERAL_ERROR,
      },
    })
  }
}

async function saveImageLocally(imageURL: string): Promise<void> {
  try {
    const axiosRes = await axios({
      url: imageURL,
      responseType: 'arraybuffer',
    })

    const buffer = Buffer.from(axiosRes.data, 'binary')

    Jimp.read(buffer, (err, image) => {
      if (err) {
        throw new Error('Error Running Image Reader:', err)
      } else {
        image.write(IMAGE_FILENAME, () => {
          console.log('Local Image Saved Successfully!')
        })
      }
    })
  } catch (error: any) {
    console.error('Error Saving Image Locally:', error.message)
  }
}
