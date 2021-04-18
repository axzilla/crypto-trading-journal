// Packages
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import axios from 'axios'

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<unknown> {
  try {
    const session = await getSession({ req })
    if (!session) return res.status(401)

    const url = 'https://api.coinmarketcap.com/data-api/v3/map/all?listing_status=active,untracked'
    const { data } = await axios.get(url)

    res.status(200).json([...data.data.exchangeMap])
  } catch (error) {
    if (error) throw error
    res.status(400).json(error)
  }
}
