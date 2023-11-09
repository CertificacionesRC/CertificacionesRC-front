import { Center } from '@chakra-ui/react'
import { getSession } from '@/utils/actions'
import { RedirectType, redirect } from 'next/navigation'
import { ROUTES } from '@/utils/routes'
import SignIn from './components/signin'

async function SignInPage() {
  const session = await getSession()

  if (session) {
    redirect(ROUTES.DOCUMENT, RedirectType.replace)
  }

  return (
    <Center bg="gray.100" h="100vh">
      <SignIn />
    </Center>
  )
}

export default SignInPage