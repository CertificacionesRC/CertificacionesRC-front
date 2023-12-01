import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'
import Providers from '@/providers/providers'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Certificaciones RC',
  title: 'Certificaciones RC',
}

async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
