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
          color="white"
          fontSize="2xl"
          icon={<Icon as={FiPlus} />}
          onClick={createModal.onOpen}
        />
      </Flex>
      <Card variant="outline">
        <TableContainer minH="60vh">
          <Table>
            <Thead>
              <Tr>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Código
                </Th>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Nombre
                </Th>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Usuario
                </Th>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Correo
                </Th>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Estado
                </Th>
                <Th textAlign="center" fontSize="sm" fontWeight="bold" color="gray.700">
                  Editar
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td textAlign="center" fontSize="sm" fontWeight="medium" color="gray.700">
                    {user.id}
                  </Td>
                  <Td textAlign="center" fontSize="sm" fontWeight="medium" color="gray.700">
                    {user.name}
                  </Td>
                  <Td textAlign="center" fontSize="sm" fontWeight="medium" color="gray.700">
                    {user.email}
                  </Td>
                  <Td textAlign="center" fontSize="sm" fontWeight="medium" color="gray.700">
                    {user.email}
                  </Td>
                  <Td textAlign="center" color="gray.700">
                    <Select>
                      <option value="active">Habilitado</option>
                      <option value="active">Inhabilitado</option>
                    </Select>
                  </Td>
                  <Td textAlign="center">
                    <IconButton
                      bg="white"
                      fontSize="2xl"
                      color="primary"
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
