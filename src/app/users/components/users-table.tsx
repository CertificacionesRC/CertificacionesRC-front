'use client'

import {
  Card,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'

import { FiEdit, FiPlus, FiSearch } from 'react-icons/fi'
import { ICustomUser } from '@/utils/models'
import { useState } from 'react'
import UpdateUserModal from './update-user-modal'
import CreateUserModal from './create-user-modal'

function UsersTable({ users }: { users: ICustomUser[] }) {
  const [user, setUser] = useState<ICustomUser>()
  const updateModal = useDisclosure()
  const createModal = useDisclosure()

  return (
    <Stack spacing="4">
      <Flex gap="4">
        <InputGroup>
          <InputLeftElement>
            <Icon as={FiSearch} />
          </InputLeftElement>
          <Input bg="white" placeholder="Buscar" />
        </InputGroup>
        <IconButton
          title="Agregar usuario"
          aria-label="Agregar usuario"
          colorScheme="blue"
          icon={<Icon as={FiPlus} />}
          onClick={createModal.onOpen}
        />
      </Flex>
      <Card variant="outline">
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Código</Th>
                <Th>Nombre</Th>
                <Th>Usuario</Th>
                <Th>Correo</Th>
                <Th>Estado</Th>
                <Th>Editar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Select>
                      <option value="active">Habilitado</option>
                      <option value="active">Inhabilitado</option>
                    </Select>
                  </Td>
                  <Td>
                    <IconButton
                      colorScheme="blue"
                      title="Editar usuario"
                      aria-label="Editar usuario"
                      icon={<Icon as={FiEdit} />}
                      onClick={() => {
                        setUser(user)
                        updateModal.onOpen()
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
      {user && <UpdateUserModal selectedUser={user} isOpen={updateModal.isOpen} onClose={updateModal.onClose} />}
      <CreateUserModal isOpen={createModal.isOpen} onClose={createModal.onClose} />
    </Stack>
  )
}

export default UsersTable
