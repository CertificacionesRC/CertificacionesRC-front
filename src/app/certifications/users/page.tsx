import { api } from '@/services/api'
import { Stack } from '@chakra-ui/react'
import { UserModalProvider } from '@/app/certifications/users/hooks/user-modal'
import Layout from '@/app/certifications/users/components/layout'

async function UsersPage() {
  const users = await api.getAllCustomUsers()

  return (
    <Stack spacing="4">
      <UserModalProvider>
        <Layout users={users} />
      </UserModalProvider>
    </Stack>
  )
}

export default UsersPage
