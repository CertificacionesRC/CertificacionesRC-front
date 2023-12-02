import { api } from '@/services/api'
import { Stack, Text } from '@chakra-ui/react'
import { UserModalProvider } from './hooks/user-modal'
import Layout from '@/app/certifications/users/components/layout'

async function UsersPage() {
  const users = await api.getAllCustomUsers()

  return (
    <Stack spacing="4">
      <Text as="h1" fontWeight="semibold" fontSize="xl">
        Usuarios
      </Text>
      <UserModalProvider>
        <Layout users={users} />
      </UserModalProvider>
    </Stack>
  )
}

export default UsersPage
