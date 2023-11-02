'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { theme } from '@/utils/theme'

function Providers({ children }: React.PropsWithChildren) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <SessionProvider>{children}</SessionProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default Providers
