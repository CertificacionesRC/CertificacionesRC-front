import { AsideMenuItem } from '@/components/layout'
import { FiHome, FiList, FiUsers, FiFile } from 'react-icons/fi'
import { ROUTES } from '@/utils/routes'
import { Stack, Text } from '@chakra-ui/react'
import { IAuthority, TAuthorities } from '@/utils/models'
import SignOut from './signout'

type IRoutes = {
  href: string
  name: string
  icon: React.ReactNode
  authorities: TAuthorities[]
}

const routes: IRoutes[] = [
  {
    href: ROUTES.HOME,
    name: 'Inicio',
    icon: <FiHome />,
    authorities: ['ADMIN', 'SUPERUSUARIO', 'CORDINADOR'],
  },
  {
    href: ROUTES.DOCUMENT,
    name: 'Documento',
    icon: <FiFile />,
    authorities: ['ADMIN', 'SUPERUSUARIO', 'CORDINADOR'],
  },
  {
    href: ROUTES.HISTORY,
    name: 'Historial',
    icon: <FiList />,
    authorities: ['ADMIN', 'SUPERUSUARIO', 'CORDINADOR'],
  },
  {
    href: ROUTES.USERS,
    name: 'Usuarios',
    icon: <FiUsers />,
    authorities: ['ADMIN', 'SUPERUSUARIO', 'CORDINADOR'],
  },
]

interface Props {
  authorities: IAuthority[]
}

function MainAsideMenu({ authorities }: Props) {
  const formatedOptions = routes.filter((route) => {
    return route.authorities.some((authority) => {
      return authorities.some((userAuthority) => {
        return userAuthority.authority === authority
      })
    })
  })

  return (
    <Stack spacing="4">
      <Stack px="4" justifyContent="center" h="58px">
        <Text as="span" fontWeight="bold" fontSize="xl">
          Certificaciones RC
        </Text>
      </Stack>
      <Stack px="4" spacing="4">
        {formatedOptions.map((route, index) => (
          <AsideMenuItem key={index} href={route.href} name={route.name} icon={route.icon} />
        ))}
        <SignOut />
      </Stack>
    </Stack>
  )
}

export default MainAsideMenu
