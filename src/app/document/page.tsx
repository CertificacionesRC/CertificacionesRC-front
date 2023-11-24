'use client'
import React, { useEffect, useState } from 'react'
import CertificateHistory from '../history/components/certificate-history'
import { getSession } from '@/utils/actions'
import CardInitDocument from './components/card-init-document'

function DocumentPage() {
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
  return <> {isAdmin !== null && isAdmin ? <CertificateHistory /> : <CardInitDocument />}</>
}

export default DocumentPage
