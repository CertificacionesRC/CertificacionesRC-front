import React from 'react'
import { useModal } from './basic-modal'
import {
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack
} from '@chakra-ui/react'
import { ROUTES } from '@/utils/routes'
import { useRouter } from 'next/navigation'

export default function FormModal() {
  const [BasicModal, openModal, closeModal] = useModal()
  const router = useRouter()

  const FormModalComponent = () => (
    <BasicModal
    okFunction={() => router.push('')}
    okButtonText="Editar usuario"
    title="Editar Usuario"
  >
    <FormControl>
      <Stack mb={5} spacing={2}>
        <FormLabel>Código *</FormLabel>
        <Input placeholder="Código" />
      </Stack>
      <Stack mb={5} spacing={2}>
        <FormLabel>Usuario *</FormLabel>
        <Input placeholder="usuario" />
      </Stack>
      <Stack mb={5} spacing={2}>
        <FormLabel>Nombre *</FormLabel>
        <Input placeholder="nombre" />
      </Stack>
      <Stack mb={5} spacing={2}>
        <FormLabel>Correo *</FormLabel>
        <Input placeholder="correo" />
      </Stack>
      <Stack mb={5} spacing={2}>
        <FormLabel>Estado *</FormLabel>
        <Select>
          <option>Seleccionar</option>
          <option>Habilitado</option>
          <option>Inhabilitado</option>
        </Select>
      </Stack>
      <Stack mb={5} spacing={2}>
        <FormLabel>Rol *</FormLabel>
        <Select>
          <option>Seleccionar</option>
          <option>Administrador</option>
          <option>Coordinador</option>
        </Select>
      </Stack>
    </FormControl>
  </BasicModal>
  )

  return [FormModalComponent, openModal, closeModal] as const
}
