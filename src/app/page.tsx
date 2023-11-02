import Login from '@/components/login/login'
import { config } from '@/utils/auth'
import { Center } from '@chakra-ui/react'
import { getServerSession } from 'next-auth/next'
import { RedirectType, redirect } from 'next/navigation'

async function RootPage() {
  const session = await getServerSession(config)

  if (session) {
    redirect('/certificaciones', RedirectType.replace)
  }

  return (
    <Center h="100vh">
      <Login />
    </Center>
  )
}

export default RootPage
