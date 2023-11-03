import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'

export const config: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'email',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        try {
          const response = await fetch('http://localhost:8081/api/login', {
            method: 'POST',
            headers: {
              contentType: 'application/json',
            },
            body: JSON.stringify({
              correo: credentials?.email,
              contrasena: credentials?.password,
            }),
          })

          const json = await response.json()

          return {
            email: json.user.username,
            image: '',
            name: '',
            id: '',
            token: json.token,
          }
        } catch (error) {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
  pages: {
    signIn: '/',
  },
}
