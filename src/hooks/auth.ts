'use client'

import { SessionContext } from '@/context/auth'
import { useContext } from 'react'

export const useSession = () => {
  return useContext(SessionContext)
}
