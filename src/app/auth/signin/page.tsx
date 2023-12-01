import { Center } from '@chakra-ui/react'
import SignIn from './components/signin'

async function SignInPage() {
  return (
    <Center bg="gray.100" h="100vh">
      <SignIn />
    </Center>
  )
}

export default SignInPage
