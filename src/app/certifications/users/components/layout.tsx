'use client'

import { FiPlus } from 'react-icons/fi'
import { Icon, IconButton, Stack } from '@chakra-ui/react'
import { ICustomUser } from '@/utils/models'
import { useUserModal } from '@/app/certifications/users/hooks/user-modal'
import CreateModal from '@/app/certifications/users/components/modals/create'
import UpdateModal from '@/app/certifications/users/components/modals/update'
import UsersTable from '@/app/certifications/users/components/table'

function Layout({ users }: { users: ICustomUser[] }) {
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
      <UpdateModal isOpen={isOpenEdit} onClose={handleClose} user={user} />
      <CreateModal isOpen={isOpenCreate} onClose={handleClose} />
    </Stack>
  )
}

export default Layout
