import { MainLayout } from '@/components/layouts'
import { getSession } from '@/utils/actions'

async function DocumentLayout({ children }: React.PropsWithChildren) {
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
          href: '/users',
          text: 'Usuarios',
        },
      ]}
    >
      {children}
    </MainLayout>
  )
}

export default DocumentLayout
