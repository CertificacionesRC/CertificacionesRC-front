import { Button, Card, CardBody, Heading, Stack } from '@chakra-ui/react'
import { IMAGE_PATHS } from '@/utils/constants'
import { ROUTES } from '@/utils/routes'
import Image from 'next/image'
import Link from 'next/link'
import AuthLayout from '@/components/layouts/auth/layout'

function RootPage() {
  return (
    <AuthLayout>
      <Card w="full" maxW="400px">
        <CardBody>
          <Stack alignItems="center" spacing="4">
            <Heading as="h1">Certificaciones RC</Heading>
            <Image alt="landing background" width={300} height={264} src={IMAGE_PATHS.BACKGROUNDS.LANDING} />
            <Button width={200} as={Link} href={ROUTES.DOCUMENT}>
              Entrar
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </AuthLayout>
  )
}

export default RootPage
