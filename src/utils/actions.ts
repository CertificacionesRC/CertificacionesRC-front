'use server'

import { cookies } from 'next/headers'
import { ISession } from './models'

const COOKIE_NAME = 'session'

export const getSession = async (): Promise<ISession | null> => {
  const storeCookies = cookies()
  const requestCookie = storeCookies.get(COOKIE_NAME)
  const session = requestCookie?.value

  if (!session) {
    return null
  }

  const sessionObject = JSON.parse(session)
  return sessionObject
}

export const signIn = async (session: ISession) => {
  const storeCookies = cookies()
  const sessionString = JSON.stringify(session)
  storeCookies.set({
    name: COOKIE_NAME,
    value: sessionString,
    httpOnly: true,
  })
}

export const signOut = async () => {
  const storeCookies = cookies()
  storeCookies.delete(COOKIE_NAME)
}
