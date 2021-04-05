import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

// https://next-auth.js.org/configuration/options
export default NextAuth({
  providers: [
    Providers.Email({
      server: {
        port: 465,
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      },
      from: process.env.EMAIL_FROM
    })
  ],
  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,
  session: { jwt: true },
  // Enable debug messages in the console if you are having problems
  debug: false
})
