'use client'

import { FiPlus } from 'react-icons/fi'
import { Icon, IconButton, Stack } from '@chakra-ui/react'
import { ICustomUser } from '@/utils/models'
import { useUserModal } from '../hooks/user-modal'
import CreateUserModal from './create-user-modal'
import UpdateUserModal from './update-user-modal'
import UsersTable from './table'

function UsersLayout({ users }: { users: ICustomUser[] }) {
  const { user, isOpenCreate, isOpenEdit, handleCreate, handleEdit, handleClose } = useUserModal()

  return (
    <Stack spacing="4">
      <IconButton
        aria-label="Agregar usuario"
        icon={<Icon fontSize="2xl" as={FiPlus} />}
        onClick={handleCreate}
        title="Agregar usuario"
      />
      <UsersTable users={users} onEdit={(user) => handleEdit(user)} />
      {user && <UpdateUserModal isOpen={isOpenEdit} onClose={handleClose} selectedUser={user} />}
      <CreateUserModal isOpen={isOpenCreate} onClose={handleClose} />
    </Stack>
  )
}

export default UsersLayout
