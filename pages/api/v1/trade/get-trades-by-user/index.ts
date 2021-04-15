// Packages
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

// DB
import dbConnect from 'utils/dbConnect'

import Trade from 'models/Trade'

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    await dbConnect()
    const session = await getSession({ req })
    const foundTrade = await Trade.find({ user: session.user._id })
    res.status(200).json(foundTrade)
  } catch (error) {
    if (error) throw error
    res.status(400).json('error')
  }
}
