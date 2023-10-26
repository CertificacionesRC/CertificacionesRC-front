import React from 'react';
import { Flex, Box, Input, Button } from '@chakra-ui/react';

function Login() {
  return (
    <Flex
      flex="1"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p="4"
    >
      <Box fontSize="2xl" mb="4">
        Iniciar sesión
      </Box>
      <Box w="100%" maxW="md">
        <Input placeholder="Correo electrónico" size="lg" mb="4" />
        <Input placeholder="Contraseña" type="password" size="lg" mb="4" />
        <Button colorScheme="teal" size="lg" width="100%">
          Iniciar sesión
        </Button>
      </Box>
    </Flex>
  );
}

export default Login;
