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

    const {
      // Trade
      type,
      leverage,
      exchange,
      symbol,
      status,
      quantityTotal,
      quantityOpen,
      cost,
      avgEntry,
      avgExit,
      returnTotal,
      returnPercent,
      // Initial order
      date,
      side,
      quantity,
      price,
      fees
    } = req.body

    const createdTrade = await Trade.create({
      type,
      leverage,
      exchange,
      symbol,
      status,
      quantityTotal,
      quantityOpen,
      cost,
      avgEntry,
      avgExit,
      returnTotal,
      returnPercent,
      side,
      user: session.user._id,
      fees,
      date,
      orders: { date, side, quantity, price, fees }
    })

    res.status(200).json(createdTrade)
  } catch (error) {
    res.status(400).json(error)
  }
}
