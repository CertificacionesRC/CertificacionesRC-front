import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Unicauca - Certificaciones RC',
  title: 'Certificaciones RC',
}

interface Props {
  children: React.ReactNode
}

function RootLayout({ children }: Props) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default RootLayout
