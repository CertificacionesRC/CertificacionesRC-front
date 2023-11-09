import { MainLayout } from '@/components/layout'
import { getSession } from '@/utils/actions'
import { ROUTES } from '@/utils/routes'
import { RedirectType, redirect } from 'next/navigation'

async function DocumentLayout({ children }: React.PropsWithChildren) {
  const session = await getSession()

  if (!session) {
    redirect(ROUTES.SIGNIN, RedirectType.replace)
  }

  return <MainLayout authorities={session.user.authorities}>{children}</MainLayout>
}

export default DocumentLayout
