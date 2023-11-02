'use client'

import { Flex, Box, Input, Button } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

function Login() {
  const router = useRouter()

  return (
    <Flex flex="1" flexDirection="column" alignItems="center" justifyContent="center" p="4">
      <Box fontSize="2xl" mb="4">
        Iniciar sesión
      </Box>
      <Box w="100%" maxW="md">
        <Input placeholder="Correo electrónico" size="lg" mb="4" />
        <Input placeholder="Contraseña" type="password" size="lg" mb="4" />
        <Button
          onClick={async () => {
            await signIn('credentials', {
              email: '312312',
              password: '32312',
              redirect: false,
            })
            router.replace('/certificaciones')
          }}
          colorScheme="teal"
          size="lg"
          width="100%"
        >
          Iniciar sesión
        </Button>
      </Box>
    </Flex>
  )
}

export default Login
