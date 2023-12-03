'use client'

import { api } from '@/services/api'
import { revalidate } from '@/utils/actions'
import { ROLES_LIST, ROLE_ADAPT, ROLE_MOCKS, STATUS_LIST, STATUS_MOCKS } from '@/utils/constants'
import { Stack, useToast } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormModal from '@/components/modals/form-modal'
import SelectInput from '@/components/common/select-input'
import TextInput from '@/components/common/text-input'

interface Props {
  isOpen: boolean
  onClose: () => void
}

type FormValues = {
  email: string
  id: string
  name: string
  password: string
  roleId: number
  status: string
}

function CreateModal({ isOpen, onClose }: Props) {
  const toast = useToast()

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      id: '',
      name: '',
      password: '',
      roleId: ROLE_MOCKS.COORDINATOR.roleId,
      status: String(STATUS_MOCKS.ACTIVE.value),
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    const role = ROLE_ADAPT[values.roleId]

    return api
      .createCustomUser({
        email: values.email,
        id: values.id,
        name: values.name,
        password: values.password,
        roleId: role.roleId,
        roleName: role.roleName,
        status: values.status === 'true',
      })
      .then(async (message) => {
        await revalidate('/users')

        toast({
          status: 'success',
          title: message,
        })

        reset()
        onClose()
      })
      .catch((error) => {
        toast({
          status: 'error',
          title: error,
        })
      })
  }

  return (
    <FormModal
      buttonTitle="Guardar cambios"
      headerTitle="Crear usuario"
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
        <SelectInput isRequired label="Estado" {...register('status')}>
          {STATUS_LIST.map((status) => (
            <option key={status.stringValue} value={status.stringValue}>
              {status.name}
            </option>
          ))}
        </SelectInput>
        <SelectInput isRequired label="Rol" {...register('roleId')}>
          {ROLES_LIST.map((role) => (
            <option key={role.roleId} value={role.roleId}>
              {role.roleName}
            </option>
          ))}
        </SelectInput>
      </Stack>
    </FormModal>
  )
}

export default CreateModal
