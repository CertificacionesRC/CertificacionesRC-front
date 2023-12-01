import { Avatar, AvatarBadge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Spacer } from '@chakra-ui/react'
import { FiBell, FiHome } from 'react-icons/fi'

export type IBreadcum = {
  text: string
  href: string
}

function MainHeader({ breadcums }: { breadcums: IBreadcum[] }) {
  return (
    <Flex flex="1" alignItems="center" gap="4" px="4">
      <FiHome />
      <Breadcrumb>
        {breadcums.map((breadcum, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink href={breadcum.href}>{breadcum.text}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      <Spacer />
      <Flex gap="8" alignItems="center">
        <FiBell />
        <Avatar w="40px" h="40px" bg="blue.500" name="G">
          <AvatarBadge boxSize="20px" bg="green.500" />
        </Avatar>
      </Flex>
    </Flex>
  )
}

export default MainHeader
