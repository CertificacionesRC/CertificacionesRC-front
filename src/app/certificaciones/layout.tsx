import { getSession } from '@/utils/actions'
import { MainLayout } from '@/components/layout'

async function CertificacionesLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) return <span>Ups, no deberias estar viendo esto</span>
  return <MainLayout authorities={session?.user.authorities}>{children}</MainLayout>
}

export default CertificacionesLayout
