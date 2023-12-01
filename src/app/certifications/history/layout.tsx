import { MainLayout } from '@/components/layout'
import { getSession } from '@/utils/actions'

async function HistoryLayout({ children }: React.PropsWithChildren) {
  const session = await getSession()
  if (!session) return <span>Ups, no deberias estar viendo esto</span>
  return (
    <MainLayout
      authorities={session.user.authorities}
      breadcums={[
        {
          href: '/',
          text: 'Inicio',
        },
        {
          href: '/history',
          text: 'Historial',
        },
      ]}
    >
      {children}
    </MainLayout>
  )
}

export default HistoryLayout
