// Packages
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import formidable from 'formidable'
import _ from 'lodash'

// Utils
import cloudinary from 'utils/cloudinary'

// DB
import dbConnect from 'utils/dbConnect'
import Trade from 'models/Trade'

export const config = { api: { bodyParser: false } }

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<unknown> {
  try {
    const session = await getSession({ req })
    if (!session) return res.status(401)

    await dbConnect()

    const folder =
      process.env.NODE_ENV === 'development'
        ? '/crypto-trading-journal/development/trade/images'
        : '/crypto-trading-journal/production/trade/images'

    const form = new formidable.IncomingForm({ multiples: true })
    form.keepExtensions = true

    form.parse(req, async (err, fields, files) => {
      // User has chosen multiple images
      const isMultiple = _.isArray(files.image)

      if (isMultiple) {
        await Promise.all(
          files.image.map(async image => {
            const uploadedImage = await cloudinary.v2.uploader.upload(image.path, { folder })

            return await Trade.findOneAndUpdate(
              { _id: fields.tradeId, user: session.user._id },
              { $push: { images: uploadedImage as never } }
            )
          })
        )

        res.status(200).json('success')
      } else {
        const image = files.image
        const uploadedImage = await cloudinary.v2.uploader.upload(image.path, { folder })

        await Trade.findOneAndUpdate(
          { _id: fields.tradeId, user: session.user._id },
          { $push: { images: uploadedImage as never } }
        )

        res.status(200).json('success')
      }
    })
  } catch (error) {
    res.status(400).json(error)
  }
}
