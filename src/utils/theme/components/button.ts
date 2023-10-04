import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const aside = defineStyle({
  fontSize: 'lg',
  justifyContent: 'flex-start',
  _active: {
    backgroundColor: 'gray.100',
  },
})

export const Button = defineStyleConfig({
  variants: {
    aside,
  },
})
