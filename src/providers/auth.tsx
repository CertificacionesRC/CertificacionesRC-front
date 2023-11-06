'use client'

import { SessionContext } from '@/context/auth'
import { ISession } from '@/utils/models'

interface Props {
  children: React.ReactNode
  session: ISession | null
}

function SessionProvider({ children, session }: Props) {
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
}

export default SessionProvider
