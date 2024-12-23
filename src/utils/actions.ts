'use server'

import { cookies } from 'next/headers'
import { ISession } from './models'
import { revalidatePath } from 'next/cache'

const COOKIE_NAME = 'session'

export const getSession = async (): Promise<ISession> => {
  const storeCookies = cookies()
  const requestCookie = storeCookies.get(COOKIE_NAME)
  const session = requestCookie?.value

  if (!session) {
    throw 'No session found'
  }

  const sessionObject = JSON.parse(session)
  return sessionObject
}

export const setAuthCookies = async (session: ISession): Promise<boolean> => {
  const storeCookies = cookies()
  const sessionString = JSON.stringify(session)
  storeCookies.set({
    name: COOKIE_NAME,
    value: sessionString,
    httpOnly: true,
  })

  return true
}

export const removeAuthCookies = async (): Promise<boolean> => {
  const storeCookies = cookies()
  storeCookies.delete(COOKIE_NAME)

  return true
}

export const revalidate = async (path: string) => {
  'use server'
  revalidatePath(path)
}
