import { api } from '@/services/api'
import { getSession } from '@/utils/actions'
import DocumentForm from '@/app/certifications/document/components/document-form'
import LayoutItems from '@/app/certifications/document/components/layout-items'

async function DocumentPage() {
  const session = await getSession()
  const authorities = session.user.authorities
  const isAdmin = authorities.some((authority) => authority.authority === 'ADMIN')

  if (isAdmin) {
    return null
  }

  const documentExists = await api.getExistsRC({
    id: session.id,
  })

  if (documentExists) {
    return <LayoutItems />
  }

  return <DocumentForm />
}

export default DocumentPage
