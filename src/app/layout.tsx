import { getSession } from '@/utils/actions'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'
import Providers from '@/providers/providers'
import SessionProvider from '@/providers/auth'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Certificaciones RC',
  title: 'Certificaciones RC',
}

async function RootLayout({ children }: PropsWithChildren) {
  const session = await getSession()

  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <SessionProvider session={session}>{children}</SessionProvider>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
