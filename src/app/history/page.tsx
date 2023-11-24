'use client'
import React, { useEffect, useState } from 'react'
import TableDocument from './components/table-document'
import CertificateHistory from './components/certificate-history'
import { getSession } from '@/utils/actions'

function HistoryPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  useEffect(() => {
    const checkAdminAuthority = async () => {
      const session = await getSession()
      const authorities = session?.user.authorities || []
      const isAdminUser = authorities.some((authority) => authority.authority === 'ADMIN')
      setIsAdmin(isAdminUser)
    }

    checkAdminAuthority()
  }, [])

  return <>{isAdmin !== null && isAdmin ? <CertificateHistory /> : <TableDocument />}</>
}

export default HistoryPage
