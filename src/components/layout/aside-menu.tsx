import { AsideMenuItem } from '@/components/layout'
import { Stack, Text } from '@chakra-ui/react'
import { FiHome, FiList, FiUsers, FiFile } from 'react-icons/fi'
import { ROUTES } from '@/utils/routes'
import SignOut from './signout'

const routes = [
  {
    href: ROUTES.HOME,
    name: 'Inicio',
    icon: <FiHome />,
  },
  {
    href: ROUTES.DOCUMENT,
    name: 'Documento',
    icon: <FiFile />,
  },
  {
    href: ROUTES.HISTORY,
    name: 'Historial',
    icon: <FiList />,
  },
  {
    href: ROUTES.USERS,
    name: 'Usuarios',
    icon: <FiUsers />,
  },
]

function MainAsideMenu() {
  return (
    <Stack spacing="4">
      <Stack px="4" justifyContent="center" h="58px">
        <Text as="span" fontWeight="bold" fontSize="xl">
          Certificaciones RC
        </Text>
      </Stack>
      <Stack px="4" spacing="4">
        {routes.map((route, index) => (
          <AsideMenuItem key={index} href={route.href} name={route.name} icon={route.icon} />
        ))}
        <SignOut />
      </Stack>
    </Stack>
  )
}

export default MainAsideMenu
