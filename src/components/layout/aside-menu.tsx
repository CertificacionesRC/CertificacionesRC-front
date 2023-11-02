'use client'

import { signOut } from 'next-auth/react'
import { AsideMenuItem } from '@/components/layout'
import { ROUTES } from '@/utils/routes'
import { Button, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

function MainAsideMenu() {
  const router = useRouter()

  return (
    <Stack p="4" gap="4">
      <Text as="h1" fontSize="2xl" lineHeight="8" fontWeight="extrabold">
        NameApp
      </Text>
      <AsideMenuItem href={ROUTES.HOME} name="Inicio" />
      <AsideMenuItem href={ROUTES.DOCUMENT} name="Documento" />
      <AsideMenuItem href={ROUTES.HISTORY} name="Historial" />
      <AsideMenuItem href={ROUTES.USERS} name="Usuarios" />
      <Button
        onClick={() => {
          signOut({ redirect: false })
          router.replace('/')
        }}
      >
        Cerrar sesión
      </Button>
    </Stack>
  )
}

export default MainAsideMenu
