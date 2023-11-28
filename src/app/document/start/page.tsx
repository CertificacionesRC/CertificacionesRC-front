'use client'

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'

import { ROUTES } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { api } from '@/services/api'
import { getSession } from '@/utils/actions'

type FormValues = {
  program: number
  date: string
  collaborators: string
}

function DocumentStartPage() {
  const router = useRouter()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      program: 0,
      date: '',
      collaborators: '',
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const session = await getSession()
    return api
      .createRegistroCalificado({
        autor: session?.id ?? 0,
        colaboradores: values.collaborators,
        fechaCreacion: values.date,
        programaAcademico: Number(values.program),
      })
      .then(() => {
        toast({
          title: 'Registro acádemico creado exitosamente',
          status: 'success',
        })
        router.replace(ROUTES.DOCUMENT_FACULTY('sistemas'))
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
    <Center>
      <Card w="full" maxW="400px" p="4">
        <CardHeader textAlign="center">
          <Text fontSize="20px" fontWeight="400">
            Antes de continuar ayúdanos a completar el siguiente formulario
          </Text>
        </CardHeader>
        <CardBody>
          <Stack spacing="4" as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Tipo de programa</FormLabel>
              <Select {...register('program', { required: true })}>
                <option>Seleccionar</option>
                <option value={1}>sistemas</option>
                <option value={2}>electronica</option>
                <option value={3}>civil</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Fecha de creación</FormLabel>
              <Input placeholder="Fecha de creación" type="date" {...register('date', { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>Colaboradores</FormLabel>
              <Textarea placeholder="Nombre de los coordinadores" {...register('collaborators', { required: true })} />
            </FormControl>
            <Button type="submit" isLoading={isSubmitting}>
              Iniciar el documento
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Center>
  )
}

export default DocumentStartPage
