import { colors } from '@/utils/theme/styles'
import { extendTheme } from '@chakra-ui/react'

const overrides = {
  colors,
}

export const theme = extendTheme(overrides)
