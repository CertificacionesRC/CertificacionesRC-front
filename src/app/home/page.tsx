import { ROUTES } from '@/utils/routes'
import { Button, Card, CardBody, CardHeader, Center, Text } from '@chakra-ui/react'
import Link from 'next/link'

function HomePage() {
  return (
    <Center>
      <Card w="full" maxW="400px" textAlign="center">
        <CardHeader>
          <Text textAlign="center">
            Crea de manera dinámica y eficiente el documento de <strong>registro calificado</strong>
          </Text>
        </CardHeader>
        <CardBody>
          <Button replace as={Link} href={ROUTES.START_DOCUMENT}>
            Iniciar el documento
          </Button>
        </CardBody>
      </Card>
    </Center>
  )
}

export default HomePage
