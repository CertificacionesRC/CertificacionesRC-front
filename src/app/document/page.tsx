import React from 'react'
import CertificateHistory from '../history/components/certificate-history'
import { getSession } from '@/utils/actions'
import CardInitDocument from './components/card-init-document'
import { api } from '@/services/api'
import LayoutItems from './[faculty]/components/layout-items'

async function DocumentPage() {
  const session = await getSession()
  const authorities = session?.user.authorities || []
  const isAdmin = authorities.some((authority) => authority.authority === 'ADMIN')
  const id = session?.id ?? -1
  const registroCalificado = await api.getAutorRC({ id })

  return (
    <>
      {' '}
      {isAdmin !== null && isAdmin ? (
        <CertificateHistory />
      ) : registroCalificado !== null ? (
        <LayoutItems />
      ) : (
        <CardInitDocument />
      )}
    </>
  )
}

export default DocumentPage
