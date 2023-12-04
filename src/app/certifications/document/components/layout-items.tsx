import { Button, Flex, Spacer, Stack, Text } from '@chakra-ui/react'
import { IQualifiedRegistration } from '@/utils/models'
import Items from '@/app/certifications/document/components/items'
import Link from 'next/link'

interface Props {
  certificate: IQualifiedRegistration
}

function LayoutItems({ certificate }: Props) {
  return (
    <Stack spacing="8">
      <Flex>
        <Text fontWeight="semibold" fontSize="2xl" color="textColor">
          {certificate.academicProgram?.faculty ?? 'Desconocido'}
        </Text>
        <Spacer />
        <Button
          as={Link}
          href={`http://localhost:8081/api/registrocalificado/getDocumento?IdRegistroCalificado=${certificate.id}`}
          variant="solid"
        >
          Generar documento
        </Button>
      </Flex>
      <Items />
    </Stack>
  )
}
export default LayoutItems
