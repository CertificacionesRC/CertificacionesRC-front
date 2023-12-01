'use client'

import { api } from '@/services/api'
import { Input, Stack, FormControl, FormLabel, Button, useToast } from '@chakra-ui/react'
import { ROUTES } from '@/utils/routes'
import { setAuthCookies } from '@/utils/actions'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

interface FormValues {
  email: string
  password: string
}

function SignInForm() {
  const router = useRouter()
  const toast = useToast()

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    return api
      .signIn({
        email: values.email,
        password: values.password,
      })
      .then(async (session) => {
        await setAuthCookies(session)

        toast({
          title: session.mensaje,
          status: 'success',
        })

        reset()
        router.replace(ROUTES.HOME)
      })
      .catch((error) => {
        toast({
          title: error,
          status: 'error',
        })
      })
  }

  return (
    <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired {...register('email')}>
        <FormLabel color="gray.700" fontSize="md" fontWeight="medium">
          Correo:
        </FormLabel>
        <Input name="email" placeholder="Ingrese su nombre de usuario aquí" type="email" />
      </FormControl>
      <FormControl isRequired {...register('password')}>
        <FormLabel color="gray.700" fontSize="md" fontWeight="medium">
          Contraseña:
        </FormLabel>
        <Input name="password" placeholder="Ingrese su contraseña aquí" type="password" />
      </FormControl>
      <Button type="submit" isLoading={isSubmitting} aria-disabled={isSubmitting}>
        Acceder
      </Button>
    </Stack>
  )
}

export default SignInForm
