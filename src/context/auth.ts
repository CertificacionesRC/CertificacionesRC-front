'use client'

import { ISession } from '@/utils/models'
import { createContext } from 'react'

export const SessionContext = createContext<ISession | null>(null)
