import { Grid, Flex, Center, Text } from '@chakra-ui/react'
import { IMAGE_PATHS } from '@/utils/constants'
import Image from 'next/image'
import type { PropsWithChildren } from 'react'

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Grid bg="bg" h="100vh" gridTemplateRows="auto 1fr auto">
      <Flex bg="surface" p="4" borderBottom="1px" borderColor="gray.200" alignItems="center" gap="4">
        <Image alt="Logo de la Universidad del cauca" width={50} height={50} src={IMAGE_PATHS.LOGOS.UNICAUCA} />
        <Text fontWeight="semibold" fontSize="lg" as="span">
          Universidad del Cauca
        </Text>
      </Flex>
      <Center>{children}</Center>
      <Flex bg="surface" p="4" borderTop="1px" borderColor="gray.200">
        <Text>
          Aplicativo realizado por el curso: {'\t'}
          <strong>Proyecto II</strong>
        </Text>
      </Flex>
    </Grid>
  )
}

export default AuthLayout
