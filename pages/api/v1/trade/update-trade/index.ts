// Packages
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

// DB
import dbConnect from 'utils/dbConnect'

// Models
import Trade from 'models/Trade'

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    await dbConnect()
    const session = await getSession({ req })
    const { changedTrade } = req.body

    const updatedTrade = await Trade.findOneAndUpdate(
      { _id: changedTrade._id, user: session.user._id },
      changedTrade
    )

    res.status(200).json(updatedTrade)
  } catch (error) {
    if (error) throw error
    res.status(400).json('error')
  }
}
