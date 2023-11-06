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

type FormValues = {
  username: string
  password: string
}

function SignIn() {
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
      .then((session) => {
        signIn(session)
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
        })
      })
      .finally(() => {})
  }

  return (
    <Card w="full" maxW="500px" p="4">
      <CardHeader textAlign="center">
        <Text as="h1" fontWeight="semibold" fontSize="xl">
          Inicio de sesión
        </Text>
      </CardHeader>
      <CardBody>
        <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>Nombre de usuario:</FormLabel>
            <Input
              placeholder="Ingrese su nombre de usuario aquí"
              type="email"
              {...register('username', { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Contraseña:</FormLabel>
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
