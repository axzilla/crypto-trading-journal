// Packages
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

// Utils
import cloudinary from 'utils/cloudinary'

// DB
import dbConnect from 'utils/dbConnect'
import Trade from 'models/Trade'

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<unknown> {
  try {
    const session = await getSession({ req })
    if (!session) return res.status(401)

    await dbConnect()
    const { tradeId, image } = req.body

    await cloudinary.v2.uploader.destroy(image.public_id)

    await Trade.findOneAndUpdate(
      { _id: tradeId, user: session.user._id },
      { $pull: { images: { asset_id: image.asset_id } } }
    )

    res.status(200).json('success')
  } catch (error) {
    res.status(400).json(error)
  }
}
