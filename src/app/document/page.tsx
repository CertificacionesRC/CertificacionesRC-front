import React from 'react'
import CertificateHistory from '../history/components/certificate-history'
import { getSession } from '@/utils/actions'
import CardInitDocument from './components/card-init-document'

async function DocumentPage() {
  const session = await getSession()
  const authorities = session?.user.authorities || []
  const isAdmin = authorities.some((authority) => authority.authority === 'ADMIN')

  return <> {isAdmin !== null && isAdmin ? <CertificateHistory /> : <CardInitDocument />}</>
}

export default DocumentPage
