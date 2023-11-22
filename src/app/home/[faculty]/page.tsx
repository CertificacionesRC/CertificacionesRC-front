import { Button, Flex, Spacer, Stack, Text } from '@chakra-ui/react'
import Items from './components/items'

function DocumentFacultyPage() {
  return (
    <Stack spacing="8">
      <Flex>
        <Text fontWeight="semibold" fontSize="2xl" color="textColor">
          Condiciones de calidad programa de arquitectura
        </Text>
        <Spacer />
        <Button variant="solid">Generar documento</Button>
      </Flex>

      <Items />
    </Stack>
  )
}

export default DocumentFacultyPage
