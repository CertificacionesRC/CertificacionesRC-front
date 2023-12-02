/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useToast,
} from '@chakra-ui/react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { api } from '@/services/api'
import { revalidate } from '@/utils/actions'

interface Props {
  isOpen: boolean
  onClose: () => void
}

type FormValues = {
  email: string
  id: string
  name: string
  roleId: number
  roleName: 'ADMIN' | 'CORDINADOR' | 'SUPERUSUARIO'
  status: string
  password: string
}

function CreateModal({ isOpen, onClose }: Props) {
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      id: '',
      name: '',
      roleId: 1,
      roleName: 'CORDINADOR',
      status: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    const rolId = {
      ADMIN: 1,
      CORDINADOR: 2,
      SUPERUSUARIO: 3,
    }

    return api
      .createCustomUser({
        email: values.email,
        id: values.id,
        name: values.name,
        password: values.password,
        roleId: rolId[values.roleName],
        roleName: values.roleName,
        status: values.status,
      })
      .then(async () => {
        await revalidate('/users')
        onClose()
        toast({
          title: 'Usuario creado',
          status: 'success',
        })
      })
      .catch((error) => {
        toast({
          title: error,
          status: 'error',
        })
      })
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent autoComplete="off" as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalCloseButton />
        <ModalHeader>Crear usuario</ModalHeader>
        <ModalBody>
          <Stack spacing="4">
            <FormControl>
              <FormLabel>Codigo *</FormLabel>
              <Input type="text" {...register('id', { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>Usuario *</FormLabel>
              <Input type="text" {...register('email', { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>Nombre *</FormLabel>
              <Input type="text" {...register('name', { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>Correo *</FormLabel>
              <Input type="email" {...register('email', { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>Contraseña *</FormLabel>
              <Input autoComplete="new-password" type="password" {...register('password', { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>Estado *</FormLabel>
              <Select {...register('status', { required: true })}>
                <option value="true">Habilitado</option>
                <option value="false">Inhabilitado</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Rol *</FormLabel>
              <Select {...register('roleName', { required: true })}>
                <option value="ADMIN">Administrador</option>
                <option value="COORDINADOR">Coordinador</option>
                <option value="SUPERUSUARIO">Superusuario</option>
              </Select>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" w="full" isLoading={isSubmitting}>
            Crear usuario
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateModal
