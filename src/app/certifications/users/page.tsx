import { api } from '@/services/api'
import { Stack, Text } from '@chakra-ui/react'
import UsersLayout from './components/users-layout'

async function UsersPage() {
  const users = await api.getAllCustomUsers()

  return (
    <Stack spacing="4">
      <Text as="h1" fontWeight="semibold" fontSize="xl">
        Usuarios
      </Text>
      <UsersLayout users={users} />
    </Stack>
  )
}

export default UsersPage
