import { defineStyleConfig } from '@chakra-ui/react'

export const Button = defineStyleConfig({
    variants: {
        ghost: {
            color: '#4A5568',
            _active: { color: '#003C6F'}
        },
        solid:{
            bgColor: '#003C6F',
            color: '#ffffff'
        }
    },
})
