import { AsideMenuItem } from '@/components/layout'
import { ROUTES } from '@/utils/routes'
import { Stack, Text } from '@chakra-ui/react'

function MainAsideMenu() {
  return (
    <Stack as="aside" p="4" gap="4" w="60" borderRight="2px" bg="white" borderColor="gray.100" h="100vh">
      <Text as="h1" fontSize="2xl" lineHeight="8" fontWeight="extrabold">
        NameApp
      </Text>
      <AsideMenuItem href={ROUTES.HOME} name="Inicio" />
      <AsideMenuItem href={ROUTES.DOCUMENT} name="Documento" />
      <AsideMenuItem href={ROUTES.HISTORY} name="Hsitorial" />
    </Stack>
  )
}

export default MainAsideMenu
