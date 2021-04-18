// Packages
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

// DB
import dbConnect from 'utils/dbConnect'

import Trade from 'models/Trade'

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<unknown> {
  try {
    const session = await getSession({ req })
    if (!session) return res.status(401)

    await dbConnect()
    const { tradeId } = req.query
    const foundTrade = await Trade.findOne({ _id: tradeId, user: session.user._id })
    res.status(200).json(foundTrade)
  } catch (error) {
    res.status(400).json(error)
  }
}
