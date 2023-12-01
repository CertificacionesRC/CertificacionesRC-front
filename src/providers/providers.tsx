'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { SWRConfig } from 'swr'
import { theme } from '@/utils/theme'
import { UserModalProvider } from '@/app/certifications/users/hooks/user-modal'
import type { SWRConfiguration } from 'swr'
import type { ToastProviderProps } from '@chakra-ui/react'

const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateIfStale: false,
}

const toastOptions: ToastProviderProps = {
  defaultOptions: {
    position: 'bottom-right',
  },
}

function Providers({ children }: React.PropsWithChildren) {
  return (
    <CacheProvider>
      <ChakraProvider toastOptions={toastOptions} theme={theme}>
        <SWRConfig value={swrConfig}>
          <UserModalProvider>{children}</UserModalProvider>
        </SWRConfig>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default Providers
