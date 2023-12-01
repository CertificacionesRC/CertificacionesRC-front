'use client'

import { ISession } from '@/utils/models'
import { ReactNode } from 'react'
import { SessionContext } from '@/context/auth'

interface Props {
  children: ReactNode
  session: ISession
}

function SessionProvider({ children, session }: Props) {
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
}

export default SessionProvider
