'use client'

import { api } from '@/services/api'
import { ICustomUser } from '@/utils/models'
import { revalidate } from '@/utils/actions'
import { Stack, useToast } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormModal from '@/components/modals/form-modal'
import SelectInput from '@/components/common/select-input'
import TextInput from '@/components/common/text-input'

interface Props {
  isOpen: boolean
  user: ICustomUser
  onClose: () => void
}

type FormValues = {
  email: string
  id: string
  name: string
  password: string
  roleId: number
  roleName: string
  status: boolean
}

function UpdateModal({ user, isOpen, onClose }: Props) {
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    values: {
      email: user.email,
      id: user.id,
      name: user.name,
      password: '',
      roleId: user.role.roleId,
      roleName: user.role.roleName,
      status: true,
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
        status: true,
      })
      .then(async (message) => {
        await revalidate('/users')
        onClose()
        toast({
          title: message,
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
    <FormModal
      buttonTitle="Guardar cambios"
      headerTitle="Editar usuario"
      isLoading={isSubmitting}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing="4">
        <TextInput isRequired type="email" label="Correo" {...register('email')} />
        <TextInput
          {...register('password')}
          autoComplete="new-password"
          isRequired
          label="Contraseña"
          type="password"
        />
        <TextInput isRequired type="text" label="Código" {...register('id')} />
        <TextInput isRequired type="text" label="Nombre" {...register('name')} />
        <SelectInput isRequired label="Estado" {...register('status')}></SelectInput>
        <SelectInput isRequired label="Rol" {...register('roleId')}></SelectInput>
      </Stack>
    </FormModal>
  )
}

export default UpdateModal
