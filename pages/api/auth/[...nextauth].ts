// Packages
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'

// Models
import Models from '../../../models'

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
  secret: process.env.SECRET,
  session: { jwt: true },
  adapter: Adapters.TypeORM.Adapter(
    {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      charset: 'utf8',
      ssl: { rejectUnauthorized: false }
    },
    { models: { User: Models.User } }
  ),

  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.uuid = user.uuid
      }
      return Promise.resolve(token)
    },
    session: async (session, user) => {
      session.user.uuid = user.uuid
      return Promise.resolve(session)
    }
  },

  // Enable debug messages in the console if you are having problems
  debug: true
})
