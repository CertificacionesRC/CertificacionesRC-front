'use client'

import { FiPlus } from 'react-icons/fi'
import { Flex, Icon, IconButton, Stack, Text } from '@chakra-ui/react'
import { ICustomUser } from '@/utils/models'
import { useUserModal } from '@/app/certifications/users/hooks/user-modal'
import CreateModal from '@/app/certifications/users/components/modals/create'
import UpdateModal from '@/app/certifications/users/components/modals/update'
import UsersTable from '@/app/certifications/users/components/table'

function LayoutUsers({ users }: { users: ICustomUser[] }) {
  const { user, isOpenCreate, isOpenEdit, handleCreate, handleEdit, handleClose } = useUserModal()

  return (
    <Stack spacing="4">
      <Flex justifyContent="space-between">
        <Text as="h1" fontWeight="semibold" fontSize="xl">
          Usuarios
        </Text>
        <IconButton
          aria-label="Agregar usuario"
          icon={<Icon fontSize="2xl" as={FiPlus} />}
          onClick={handleCreate}
          title="Agregar usuario"
        />
      </Flex>
      <UsersTable users={users} onEdit={(user) => handleEdit(user)} />
      <UpdateModal isOpen={isOpenEdit} onClose={handleClose} user={user} />
      <CreateModal isOpen={isOpenCreate} onClose={handleClose} />
    </Stack>
  )
}

export default LayoutUsers
