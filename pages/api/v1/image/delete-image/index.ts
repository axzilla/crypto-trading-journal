// Packages
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import cloudinary from 'cloudinary'

// DB
import dbConnect from 'utils/dbConnect'
import Trade from 'models/Trade'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    await dbConnect()
    const session = await getSession({ req })
    const { tradeId, image } = req.body

    await cloudinary.v2.uploader.destroy(image.public_id)

    await Trade.findOneAndUpdate(
      { _id: tradeId, user: session.user._id },
      { $pull: { images: { asset_id: image.asset_id } } }
    )

    res.status(200).json('success')
  } catch (error) {
    if (error) throw error
    res.status(400).json('error')
  }
}
