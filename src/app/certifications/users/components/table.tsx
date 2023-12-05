'use client'
import { Card, TableContainer, Table, Thead, Tr, Th, Tbody, Td, IconButton, useToast } from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import { ICustomUser } from '@/utils/models'
import { STATUS_LIST } from '@/utils/constants'
import SelectInput from '@/components/common/select-input'
import { api } from '@/services/api'
import { revalidate } from '@/utils/actions'

interface Props {
  users: ICustomUser[]
  onEdit: (user: ICustomUser) => void
}

const header = ['Código', 'Nombre', 'Usuario', 'Correo', 'Estado', 'Editar']

function UsersTable({ users, onEdit }: Props) {
  const toast = useToast()
  const onChangestateUser = ({ id }: { id: string }) => {
    api
      .disableOrEnableUser({ id })
      .then(async (message) => {
        await revalidate('/users')
        toast({
          status: 'success',
          title: message,
        })
      })
      .catch((error) => {
        toast({
          status: 'error',
          title: error,
        })
      })
  }

  return (
    <Card overflow="hidden">
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
                <Td>
                  <SelectInput
                    value={user.status ? 'true' : 'false'}
                    onChange={() => onChangestateUser({ id: user.id })}
                  >
                    {STATUS_LIST.map((status) => (
                      <option key={status.stringValue} value={status.stringValue}>
                        {status.name}
                      </option>
                    ))}
                  </SelectInput>
                </Td>
                <Td>
                  <IconButton
                    aria-label="Editar usuario"
                    fontSize="xl"
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
