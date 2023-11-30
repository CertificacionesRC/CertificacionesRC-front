'use server'

import { cookies } from 'next/headers'
import { ISession } from './models'
import { revalidatePath } from 'next/cache'

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

export const signIn = async (session: ISession): Promise<boolean> => {
  const storeCookies = cookies()
  const sessionString = JSON.stringify(session)
  storeCookies.set({
    name: COOKIE_NAME,
    value: sessionString,
    httpOnly: true,
  })

  return true
}

export const signOut = async (): Promise<boolean> => {
  const storeCookies = cookies()
  storeCookies.delete(COOKIE_NAME)

  return true
}

export const revalidate = async (path: string) => {
  'use server'
  revalidatePath(path)
}
