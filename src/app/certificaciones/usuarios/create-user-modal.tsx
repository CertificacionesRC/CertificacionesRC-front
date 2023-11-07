/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { SAVE_USER } from '@/service/api'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
  Stack,
  FormLabel,
} from '@chakra-ui/react'
import { ChangeEvent, FunctionComponent, useState } from 'react'

const fetchSaveUser = async (token: string, data: Record<string, any>) => {
  try {
    return await fetch(SAVE_USER, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    }).then(async (res) => await res.json())
  } catch (err) {
    console.log(err)
  }
}

interface CreateUserModalProps {
  stateOptions: Record<string, any>[]
  rolOptions: Record<string, any>[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  token: string
}
const CreatUserModal: FunctionComponent<CreateUserModalProps> = ({
  stateOptions,
  rolOptions,
  isOpen,
  setIsOpen,
  token,
}) => {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [rol, setRol] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState('')
  const toast = useToast()

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value)
  }

  const handleRolChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRol(e.target.value)
  }

  const handleSave = async () => {
    const data = {
      nombre,
      correo,
      contrasena: password,
      rol: { rolId: rol === 'ADMIN' ? 1 : 2, rolNombre: rol },
    }
    try {
      const response = await fetchSaveUser(token, data)
      toast({
        title: response.userMessage,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (err: any) {
      toast({
        title: err.userMessage,
        description: err.errorCode,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }

    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <center>
          <ModalHeader> Crear Usuario </ModalHeader>
        </center>
        <ModalCloseButton />
        <ModalBody>
          <Stack mb={3} spacing={2}>
            <FormLabel>Nombre *</FormLabel>
            <Input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Stack>
          <Stack mb={3} spacing={2}>
            <FormLabel>Correo *</FormLabel>
            <Input placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </Stack>
          <Stack mb={3} spacing={2}>
            <FormLabel>Contraseña *</FormLabel>
            <Input placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Stack>
          <Stack mb={3} spacing={2}>
            <FormLabel>Estado *</FormLabel>
            <Select placeholder="Estado" value={state} onChange={handleStateChange}>
              {stateOptions.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.name}
                </option>
              ))}
            </Select>
          </Stack>

          <Stack mb={3} spacing={2}>
            <FormLabel>Rol *</FormLabel>
            <Select placeholder="Rol" value={rol} onChange={handleRolChange}>
              {rolOptions.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.name}
                </option>
              ))}
            </Select>
          </Stack>
          <Stack mt={5} mb={5} spacing={2}>
            <center>
              <Button onClick={handleSave}>Crear usuario</Button>
            </center>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default CreatUserModal
