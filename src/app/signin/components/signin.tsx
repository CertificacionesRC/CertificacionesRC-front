'use client'

import {
  Input,
  Button,
  Stack,
  Card,
  CardHeader,
  CardBody,
  FormControl,
  FormLabel,
  Text,
  useToast,
} from '@chakra-ui/react'

import { api } from '@/services/api'
import { signIn } from '@/utils/actions'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/utils/routes'

type FormValues = {
  username: string
  password: string
}

function SignIn() {
  const router = useRouter()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    return api
      .signIn({
        username: values.username,
        password: values.password,
      })
      .then(async (session) => {
        await signIn(session)
        router.replace(ROUTES.DOCUMENT)
        toast({
          title: session.mensaje,
          status: 'success',
        })
      })
      .catch((error) => {
        toast({
          title: error,
          status: 'error',
        })
      })
      .finally(() => {})
  }

  return (
    <Card w="full" maxW="500px" p="4">
      <CardHeader textAlign="center">
        <Text fontWeight="normal" fontSize="xl" color="textColor">
          Inicio de sesión
        </Text>
      </CardHeader>
      <CardBody>
        <Stack as="form" spacing="12" onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel color="gray.700" fontSize="md" fontWeight="medium">
              Nombre de usuario:
            </FormLabel>
            <Input
              placeholder="Ingrese su nombre de usuario aquí"
              type="email"
              {...register('username', { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="gray.700" fontSize="md" fontWeight="medium">
              Contraseña:
            </FormLabel>
            <Input
              placeholder="Ingrese su contraseña aquí"
              type="password"
              {...register('password', { required: true })}
            />
          </FormControl>
          <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
            Acceder
          </Button>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default SignIn
