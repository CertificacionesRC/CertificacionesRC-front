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

import { ICustomUser } from '@/utils/models'
import { SubmitHandler, useForm } from 'react-hook-form'
import { api } from '@/services/api'
import { revalidate } from '@/utils/actions'

interface Props {
  isOpen: boolean
  selectedUser: ICustomUser
  onClose: () => void
}

type FormValues = {
  email: string
  id: string
  name: string
  roleId: number
  roleName: string
  status: boolean
  password: string
}

function UpdateUserModal({ selectedUser, isOpen, onClose }: Props) {
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    values: {
      email: selectedUser.email,
      id: selectedUser.id,
      name: selectedUser.name,
      roleId: selectedUser.role.roleId,
      roleName: selectedUser.role.roleName,
      status: selectedUser.status,
      password: selectedUser.password,
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    return api
      .updateCustomUser({
        email: values.email,
        id: values.id,
        name: values.name,
        password: values.password,
        roleId: values.roleId,
        roleName: values.roleName,
        status: values.status,
      })
      .then(async () => {        
        await revalidate('/users')
        onClose()
        toast({
          title: 'Usuario actualizado',
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
        <ModalHeader>Editar usuario</ModalHeader>
        <ModalBody>
          <Stack spacing="4">
            <FormControl>
              <FormLabel>Codigo *</FormLabel>
              <Input type="text" {...register('id', { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>Usuario *</FormLabel>
              <Input type="email" {...register('email', { required: true })} />
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
                <option value="CORDINADOR">Coordinador</option>
                <option value="SUPERUSUARIO">Superusuario</option>
              </Select>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" w="full" colorScheme="blue" isLoading={isSubmitting}>
            Guardar cambios
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpdateUserModal
