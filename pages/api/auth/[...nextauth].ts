// Packages
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

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
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: true,
    extra: { ssl: { rejectUnauthorized: false } }
  },
  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.id = user.id
      }
      return Promise.resolve(token)
    },
    session: async (session, user) => {
      session.user.id = user.id
      return Promise.resolve(session)
    }
  },

  // Enable debug messages in the console if you are having problems
  debug: true
})
