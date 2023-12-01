import { getSession } from '@/utils/actions'
import { PropsWithChildren } from 'react'
import MainLayout from '@/components/layouts/main/layout'
import SessionProvider from '@/providers/auth'

async function CertificationsLayout({ children }: PropsWithChildren) {
  const session = await getSession()

  return (
    <SessionProvider session={session}>
      <MainLayout authorities={session.user.authorities} breadcums={[]}>
        {children}
      </MainLayout>
    </SessionProvider>
  )
}

export default CertificationsLayout
