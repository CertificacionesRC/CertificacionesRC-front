/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { TableComponent } from '@/components/table/table-component'
import {
  ChakraProvider,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Select,
  useToast,
  Stack,
  FormLabel,
} from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import StateComponent from './state-component'
import { FaEdit, FaPlus } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { UPDATE_USER } from '@/service/api'
import CreatUserModal from './create-user-modal'
import Pagination from './pagination'

const stateOptions = [
  { name: 'Habilitado', value: true },
  { name: 'Inhabilitado', value: false },
]

const rolOptions = [
  { name: 'Administrador', value: 'ADMIN' },
  { name: 'Coordinador', value: 'CORDINADOR' },
]
type ApiResponse = Record<string, any>
const fetchUpdateUser = async (token: string, data: ApiResponse, id: number) => {
  try {
    return await fetch(UPDATE_USER + `/${id}`, {
      cache: 'no-store',
      method: 'PATCH',
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

export default function ManageTableUserComponent({ data, token }: { data: ApiResponse[]; token: string }) {
  const dataTable: ApiResponse[] = data
  const columnHelper = createColumnHelper<ApiResponse>()
  const toast = useToast()

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenSave, setIsOpenSave] = useState(false)
  const [currentRow, setCurrentRow] = useState<ApiResponse>()
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [rol, setRol] = useState<boolean | undefined>(false)
  const [password, setPassword] = useState('')
  const [state, setState] = useState<boolean | undefined>(false)
  useEffect(() => {
    if (currentRow) {
      setNombre(currentRow.nombre)
      setCorreo(currentRow.correo)
      setState(currentRow.estado)
      setRol(currentRow.rol.rolNombre)
    }
  }, [currentRow])

  const handleStateChange = (event: any) => {
    const selectedValue = event.target.value
    const selectedState = stateOptions.find((option) => option.name === selectedValue)
    setState(selectedState?.value)
  }
  const handleRolChange = (event: any) => {
    const selectedValue = event.target.value
    const selectedState = stateOptions.find((option) => option.name === selectedValue)
    setRol(selectedState?.value)
  }

  const openModal = (row: ApiResponse) => {
    setCurrentRow(row)
    setIsOpen(true)
  }
  const handleSave = async () => {
    const data = {
      nombre,
      correo,
      contrasena: password,
      estado: state,
      rol: { rolId: rol ? 1 : 2, rolNombre: rol },
    }
    try {
      const response = await fetchUpdateUser(token, data, currentRow?.id)
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

  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue(),
      header: 'Código',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('nombre', {
      cell: (info) => info.getValue(),
      header: 'Nombre',
    }),
    columnHelper.accessor('correo', {
      cell: (info) => info.getValue(),
      header: 'Correo',
    }),
    columnHelper.accessor('estado', {
      header: 'Estado',
      cell: (info) => <StateComponent value={info.getValue()} />,
    }),
    columnHelper.display({
      id: 'info',
      header: 'Editar',
      cell: (info) => (
        <IconButton
          bgColor={'transparent'}
          color={'#001f3f'}
          size={'md'}
          fontSize={'1.6rem'}
          aria-label="Show info"
          icon={<FaEdit />}
          onClick={() => openModal(info.row.original)}
        />
      ),
    }),
  ]
  const modal = (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <center>
          <ModalHeader>Editar usuario</ModalHeader>
        </center>
        <ModalCloseButton />
        <ModalBody>
          <Stack mb={3} spacing={2}>
            <FormLabel>Nombre</FormLabel>
            <Input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Stack>
          <Stack mb={3} spacing={2}>
            <FormLabel>Correo</FormLabel>
            <Input placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </Stack>
          <Stack mb={3} spacing={2}>
            <FormLabel>Contraseña</FormLabel>
            <Input placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Stack>
          <Stack mb={3} spacing={2}>
            <FormLabel>Estado</FormLabel>
            <Select placeholder="Estado" value={state ? 'Habilitado' : 'Inhabilitado'} onChange={handleStateChange}>
              {stateOptions.map((option, i) => (
                <option key={i} value={option.name}>
                  {option.name}
                </option>
              ))}
            </Select>
          </Stack>
          <Stack mb={3} spacing={2}>
            <FormLabel>Rol</FormLabel>
            <Select placeholder="Rol" value={rol ? 'Administrador' : 'Coordinador'} onChange={handleRolChange}>
              {rolOptions.map((option, i) => (
                <option key={i} value={option.name}>
                  {option.name}
                </option>
              ))}
            </Select>
          </Stack>
          <center>
            <Button onClick={handleSave}>Editar Usuario</Button>
          </center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
  // Estado para el número de página actual
  const [currentPage, setCurrentPage] = useState(1)

  // Función para manejar el cambio de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  // Número total de páginas (en este caso, supongo que hay 10 usuarios por página)

  //const totalPages = Math.ceil(users.length / itemsPerPage);
  const totalPages = 5

  // Lógica para obtener los usuarios en la página actual

  //const usersInCurrentPage = users.slice(startIndex, endIndex);

  return (
    <>
      {modal}
      <CreatUserModal
        isOpen={isOpenSave}
        setIsOpen={setIsOpenSave}
        stateOptions={stateOptions}
        rolOptions={rolOptions}
        token={token}
      />
      <h1 style={{ marginBottom: '20px' }}>
        <b>Usuarios</b>
      </h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Input placeholder="Buscar" />
        <Button
          leftIcon={<FaPlus />}
          bg="#001f3f"
          color="#ffffff"
          size="md"
          marginLeft="5"
          onClick={() => setIsOpenSave(true)}
        ></Button>
      </div>
      <ChakraProvider>
        <TableComponent columns={columns} data={dataTable} />
      </ChakraProvider>
      {/* Componente Pagination */}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  )
}
