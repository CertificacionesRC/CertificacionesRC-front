import { getSession } from '@/utils/actions'
import { MainLayout } from '@/components/layout'
import { RedirectType, redirect } from 'next/navigation'
import { ROUTES } from '@/utils/routes'

async function CertificacionesLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (!session) {
    redirect(ROUTES.SIGNIN, RedirectType.replace)
  }

  return <MainLayout authorities={session?.user.authorities}>{children}</MainLayout>
}

export default CertificacionesLayout
