import { api } from '@/services/api'
import { getSession } from '@/utils/actions'
import CardInitDocument from './components/card-init-document'
import LayoutItems from './[faculty]/components/layout-items'
import TableDocument from './components/table-document'

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
        <TableDocument />
      ) : registroCalificado !== null ? (
        <LayoutItems />
      ) : (
        <CardInitDocument />
      )}
    </>
  )
}

export default DocumentPage
