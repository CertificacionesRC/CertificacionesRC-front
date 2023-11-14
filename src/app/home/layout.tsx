import { MainLayout } from '@/components/layout'
import { getSession } from '@/utils/actions'

async function HomeLayout({ children }: React.PropsWithChildren) {
  const session = await getSession()
  if (!session) return <span>Ups, no deberias estar viendo esto</span>
  return <MainLayout authorities={session.user.authorities}>{children}</MainLayout>
}

export default HomeLayout
