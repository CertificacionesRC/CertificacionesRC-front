import { ROUTES } from '@/utils/routes'
import { Button, Flex, Spacer, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import Items from './items'

function LayoutItems() {
  return (
    <Stack spacing="8">
      <Flex>
        <Text fontWeight="semibold" fontSize="2xl" color="textColor">
          Condiciones de calidad programa de arquitectura
        </Text>
        <Spacer />
        <Button as={Link} href={ROUTES.DOCUMENT_PDF('sample.pdf')} variant="solid">
          Generar documento
        </Button>
      </Flex>
      <Items />
    </Stack>
  )
}
export default LayoutItems
