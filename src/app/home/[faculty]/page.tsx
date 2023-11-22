import { Stack, Text } from '@chakra-ui/react'
import Items from './components/items'

function DocumentFacultyPage() {
  return (
    <Stack spacing="8">
      <Text fontWeight="semibold" fontSize="2xl" color="textColor">
        Condiciones de calidad programa de arquitectura
      </Text>
      <Items />
    </Stack>
  )
}

export default DocumentFacultyPage
