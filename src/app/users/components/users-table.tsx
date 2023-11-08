'use client'

import {
  Card,
  Icon,
  IconButton,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'

import { FiEdit } from 'react-icons/fi'
import { ICustomUser } from '@/utils/models'
import { useState } from 'react'
import UpdateUserModal from './update-user-modal'

function UsersTable({ users }: { users: ICustomUser[] }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedUser, setSelectedUser] = useState<ICustomUser>()

  return (
    <>
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
                        setSelectedUser(user)
                        onOpen()
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
      {selectedUser && <UpdateUserModal selectedUser={selectedUser} isOpen={isOpen} onClose={onClose} />}
    </>
  )
}

export default UsersTable
