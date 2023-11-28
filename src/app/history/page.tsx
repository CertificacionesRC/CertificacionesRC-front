import React from 'react'
import TableDocument from './components/table-document'
import CertificateHistory from './components/certificate-history'
import { getSession } from '@/utils/actions'

async function HistoryPage() {
  const session = await getSession()
  const authorities = session?.user.authorities || []
  const isAdmin = authorities.some((authority) => authority.authority === 'ADMIN')

  return <>{isAdmin !== null && isAdmin ? <CertificateHistory /> : <TableDocument />}</>
}

export default HistoryPage
