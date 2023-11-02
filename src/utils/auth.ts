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
      authorize: async () => {
        try {
          const response = await fetch('http://localhost:8081/api/login', {
            method: 'POST',
            headers: {
              contentType: 'application/json',
            },
            body: JSON.stringify({
              correo: 'aaa@gmail.com',
              contrasena: 'usuario',
            }),
          })

          const json = await response.json()

          return {
            email: json.user.username,
            image: '',
            name: '',
            id: '',
          }
        } catch (error) {
          return null
        }
      },
    }),
  ],
  callbacks: {
    jwt(params) {
      return params
    },
  },
  pages: {
    signIn: '/',
  },
}
