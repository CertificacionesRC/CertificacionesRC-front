import { Card, TableContainer, Table, Thead, Tr, Th, Tbody, Td, IconButton } from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import { ICustomUser } from '@/utils/models'

interface Props {
  users: ICustomUser[]
  onEdit: (user: ICustomUser) => void
}

const header = ['Código', 'Nombre', 'Usuario', 'Correo', 'Estado', 'Editar']

function UsersTable({ users, onEdit }: Props) {
  return (
    <Card>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              {header.map((head, index) => (
                <Th key={index}>{head}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.email}</Td>
                <Td>{user.status ? 'Habilitado' : 'Deshabilitado'}</Td>
                <Td>
                  <IconButton
                    aria-label="Editar usuario"
                    icon={<FiEdit />}
                    onClick={() => onEdit(user)}
                    title="Editar usuario"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default UsersTable
