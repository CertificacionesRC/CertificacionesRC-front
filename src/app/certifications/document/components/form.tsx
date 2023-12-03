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
  Textarea,
  useToast,
} from '@chakra-ui/react'

import { api } from '@/services/api'
import { getSession, revalidate } from '@/utils/actions'
import { IProgramType } from '@/utils/models'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import useSWR from 'swr'
import { ROUTES } from '@/utils/routes'

type FormValues = {
  program?: number
  date: string
  collaborators: string
}

function Form() {
  const toast = useToast()

  const { data } = useSWR('api/programas', () => {
    return api.getProgramTypes()
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      program: undefined,
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
        programaAcademico: data?.find((program: IProgramType) => program.id == values.program),
      })
      .then(async () => {
        await revalidate(ROUTES.DOCUMENT)
        toast({
          title: 'Registro acádemico creado exitosamente',
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
    <Center>
      <Card w="full" maxW="400px">
        <CardHeader textAlign="center">Antes de continuar ayúdanos a completar el siguiente formulario</CardHeader>
        <CardBody>
          <Stack spacing="4" as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Tipo de programa</FormLabel>
              <Select placeholder="Selecciona" {...register('program', { required: true })}>
                {data?.map((program: IProgramType) => (
                  <option value={program.id} key={program.id}>
                    {program.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Fecha de creación</FormLabel>
              <Input placeholder="Fecha de creación" type="date" {...register('date', { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>Colaboradores</FormLabel>
              <Textarea placeholder="Nombre de los coordinadores" {...register('collaborators')} />
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

export default Form
