import { Button, Center, Heading, Stack } from '@chakra-ui/react'
import { ROUTES } from '@/utils/routes'
import Link from 'next/link'

function RootPage() {
  return (
    <Center h="100vh">
      <Stack alignItems="center" spacing="4">
        <Heading>Certificaciones RC</Heading>
        <Button replace w="fit-content" as={Link} href={ROUTES.DOCUMENT}>
          Entrar
        </Button>
      </Stack>
    </Center>
  )
}

export default RootPage
