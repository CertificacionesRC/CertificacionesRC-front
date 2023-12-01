import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react'
import AuthLayout from '@/components/layouts/auth-layout'
import SignInForm from '@/app/auth/signin/components/form'

function SignInPage() {
  return (
    <AuthLayout>
      <Card w="full" maxW="400px">
        <CardHeader>
          <Text as="h1" textAlign="center" fontWeight="semibold" fontSize="2xl">
            Inicio de sesión
          </Text>
        </CardHeader>
        <CardBody>
          <SignInForm />
        </CardBody>
      </Card>
    </AuthLayout>
  )
}

export default SignInPage
