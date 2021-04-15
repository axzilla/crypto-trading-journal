// Packages
import nodemailer from 'nodemailer'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

type Data = {
  message: string
}

export default async function (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> {
  try {
    const { feedback } = req.body
    const session = await getSession({ req })

    const transporter = nodemailer.createTransport({
      port: 465,
      host: 'smtp.gmail.com',
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    const mailData = {
      from: session.user.email,
      to: process.env.EMAIL_USERNAME,
      subject: 'Crypto Trading Journal Feedback!',
      html: `
        <p>From:</p>
        <p>${session.user.email}</p>
        <p>Message:</p>
        <p>${feedback}</p>
      `
    }

    const mailResponse = await transporter.sendMail(mailData)
    console.log(mailResponse) // eslint-disable-line

    res.status(200).json({ message: 'success' })
  } catch (error) {
    if (error) throw error
  }
}
