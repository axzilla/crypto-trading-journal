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
        }
      }
    })
  ],
  secret: process.env.SECRET,
  session: { jwt: true },
  database: process.env.MONGODB_URI,
  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.id = user.id
      }
      return Promise.resolve(token)
    },
    session: async (session, user) => {
      session.user._id = user.id
      return Promise.resolve(session)
    }
  },

  // Enable debug messages in the console if you are having problems
  debug: true
})
