import { ROUTES } from '@/utils/routes'
import { Box, Button, Card, CardBody, Text } from '@chakra-ui/react'
import Link from 'next/link'

const CardInitDocument = () => {
  return (
    <Box w="full" h="full" display="flex" justifyContent="center" alignItems="center">
      <Card w="full" maxW="700px" height="400px" textAlign="center">
        <CardBody display="flex" alignItems="center" justifyContent="center">
          <Box margin="0px 50px">
            <Text textAlign="center" fontSize="30px" fontWeight={'400'}>
              Crea de manera dinámica y eficiente el documento de <strong>registro calificado</strong>
            </Text>
            <Button replace as={Link} href={ROUTES.START_DOCUMENT} variant="solid" marginTop="20px">
              Crear registro calificado
            </Button>
          </Box>
        </CardBody>
      </Card>
    </Box>
  )
}
export default CardInitDocument
