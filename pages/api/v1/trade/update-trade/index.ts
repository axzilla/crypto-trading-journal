// Packages
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

// DB
import dbConnect from 'utils/dbConnect'

// Models
import Trade from 'models/Trade'

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<unknown> {
  try {
    const session = await getSession({ req })
    if (!session) return res.status(401)

    await dbConnect()
    const { changedTrade } = req.body

    const updatedTrade = await Trade.findOneAndUpdate(
      { _id: changedTrade._id, user: session.user._id },
      changedTrade
    )

    res.status(200).json(updatedTrade)
  } catch (error) {
    res.status(400).json(error)
  }
}
