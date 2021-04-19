// Packages
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

// DB
import dbConnect from 'utils/dbConnect'

// Utils
import cloudinary from 'utils/cloudinary'

// Models
import Trade from 'models/Trade'

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<unknown> {
  try {
    const session = await getSession({ req })
    if (!session) return res.status(401)

    await dbConnect()
    const { tradeId } = req.body
    const deletedTrade = await Trade.findOneAndDelete({ _id: tradeId, user: session.user._id })
    await Promise.all(
      deletedTrade.images.map(async image => {
        return await cloudinary.v2.uploader.destroy(image.public_id)
      })
    )
    res.status(200).json('success')
  } catch (error) {
    res.status(400).json(error)
  }
}
