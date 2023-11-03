'use client'

import { Flex, Box, Input, Button } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Flex flex="1" flexDirection="column" alignItems="center" justifyContent="center" p="4">
      <Box fontSize="2xl" mb="4">
        Iniciar sesión
      </Box>
      <Box w="100%" maxW="md">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          size="lg"
          mb="4"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          type="password"
          size="lg"
          mb="4"
        />
        <Button
          onClick={async () => {
            await signIn('credentials', {
              callbackUrl: '/certificaciones',
              email: email,
              password: password,
              redirect: true,
            })
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
