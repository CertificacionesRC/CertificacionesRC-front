import { Button } from '@/utils/theme/components/button'
import { colors } from '@/utils/theme/styles'
import { extendTheme } from '@chakra-ui/react'

const overrides = {
  colors,
  components: {
    Button,
  },
}

export const theme = extendTheme(overrides)
