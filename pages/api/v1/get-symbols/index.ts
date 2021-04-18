// Packages
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import axios from 'axios'

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<unknown> {
  try {
    const session = await getSession({ req })
    if (!session) return res.status(401)

    const token = process.env.IEXAPIS_TOKEN
    const url = `https://cloud.iexapis.com/stable/ref-data/crypto/symbols?=&token=${token}`
    const { data } = await axios.get(url)

    res.status(200).json(data)
  } catch (error) {
    if (error) throw error
    res.status(400).json(error)
  }
}
