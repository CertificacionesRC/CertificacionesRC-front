import { colors } from '@/utils/theme/colors'
import { extendTheme } from '@chakra-ui/react'
import { Button } from '@/utils/theme/components/button'

export const theme = extendTheme({
  colors,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  fonts: {
    body: 'Inter,system-ui,sans-serif',
    heading: 'Inter,system-ui,sans-serif',
    mono: 'Inter,system-ui,sans-serif',
  },
  components: {
    Button,
  },
})
