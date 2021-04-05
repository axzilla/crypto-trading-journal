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
  // database: process.env.DATABASE_URL,
  secret: process.env.SECRET,
  session: { jwt: true },
  adapter: Adapters.TypeORM.Adapter(
    // The first argument should be a database connection string or TypeORM config object
    process.env.DATABASE_URL,
    // The second argument can be used to pass custom models and schemas
    {
      models: {
        User: Models.User
      }
    }
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
