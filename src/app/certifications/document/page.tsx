import { api } from '@/services/api'
import { getSession } from '@/utils/actions'
import Layout from '@/app/certifications/document/components/layout'
import LayoutItems from '@/app/certifications/document/components/layout-items'

async function DocumentPage() {
  const session = await getSession()

  const certificate = await api.getExistsRC({
    id: session.id,
  })

  if (certificate !== null) {
    return <LayoutItems certificate={certificate} />
  }

  return <Layout />
}

export default DocumentPage
