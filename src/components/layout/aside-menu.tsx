import { AsideMenuItem } from '@/components/layout'
import { FiUsers } from 'react-icons/fi'
import { BiHome, BiSolidHome } from 'react-icons/bi'
import { HiUsers } from 'react-icons/hi'
import { IoDocumentAttachOutline, IoDocumentAttach, IoDocumentTextOutline, IoDocumentText } from 'react-icons/io5'
import { ROUTES } from '@/utils/routes'
import { Stack, Text } from '@chakra-ui/react'
import { IAuthority, TAuthorities } from '@/utils/models'
import SignOut from './signout'

type IRoutes = {
  href: string
  name: string
  icon: React.ReactNode
  iconActive: React.ReactNode
  authorities: TAuthorities[]
}

const routes: IRoutes[] = [
  {
    href: ROUTES.HOME,
    name: 'Inicio',
    icon: <BiHome />,
    iconActive: <BiSolidHome />,
    authorities: ['ADMIN', 'SUPERUSUARIO', 'COORDINADOR'],
  },
  {
    href: ROUTES.DOCUMENT,
    name: 'Documento',
    icon: <IoDocumentTextOutline />,
    iconActive: <IoDocumentText />,
    authorities: ['ADMIN', 'SUPERUSUARIO', 'COORDINADOR'],
  },
  {
    href: ROUTES.HISTORY,
    name: 'Historial',
    icon: <IoDocumentAttachOutline />,
    iconActive: <IoDocumentAttach />,
    authorities: ['ADMIN', 'SUPERUSUARIO', 'COORDINADOR'],
  },
  {
    href: ROUTES.USERS,
    name: 'Usuarios',
    icon: <FiUsers />,
    iconActive: <HiUsers />,
    authorities: ['ADMIN', 'SUPERUSUARIO'],
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
        <Text as="span" fontWeight="extrabold" fontSize="2xl" color="primary">
          Certificaciones RC
        </Text>
      </Stack>
      <Stack px="4" spacing="4">
        {formatedOptions.map((route, index) => (
          <AsideMenuItem
            key={index}
            href={route.href}
            name={route.name}
            icon={route.icon}
            activeIcon={route.iconActive}
          />
        ))}
        <SignOut />
      </Stack>
    </Stack>
  )
}

export default MainAsideMenu
