import { api } from '@/services/api'
import { Stack, Text } from '@chakra-ui/react'
import UsersTable from './components/users-table'

async function UsersPage() {
  const users = await api.getAllCustomUsers()

  return (
    <Stack spacing="4">
      <Text as="h1">Usuarios</Text>
      <UsersTable users={users} />
    </Stack>
  )
}

export default UsersPage
