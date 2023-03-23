import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import Jimp from 'jimp'
import { getOpenAIApi } from './bootstrapOpenAI'
const fs = require('fs')
// TODO: switch the CJS to ESM (including stream implementation)

const GENERAL_ERROR = 'Something went wrong with the request for the image variation generator'
const IMAGE_FILENAME = 'image.png'
const LOCAL_IMAGE_PATH = `./${IMAGE_FILENAME}`

// TODO: Work on Error mechanism
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body

  await saveImageLocally(prompt)

  try {
    const response = await getOpenAIApi().createImageVariation(fs.createReadStream(LOCAL_IMAGE_PATH), 2, '512x512')
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
    const image = await Jimp.read(buffer)

    await image.writeAsync(IMAGE_FILENAME)
    console.log('Image was saved successfully')
  } catch (error: any) {
    console.error('Error saving image locally:', error.message)
  }
}
