import { getSession } from '@/utils/actions'
import { Avatar, AvatarBadge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Spacer, Text } from '@chakra-ui/react'

export type IBreadcum = {
  text: string
  href: string
}

async function MainHeader({ breadcums }: { breadcums: IBreadcum[] }) {
  const session = await getSession()

  return (
    <Flex flex="1" alignItems="center" gap="4" px="4">
      <Breadcrumb>
        {breadcums.map((breadcum, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink href={breadcum.href}>{breadcum.text}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      <Spacer />
      <Flex gap="4" alignItems="center">
        <Text>{session.user.username}</Text>
        <Text px="2" bg="primary.50">
          {session.user.authorities.map(({ authority }) => authority)}
        </Text>
        <Avatar w="40px" h="40px" bg="primary.500" name="G">
          <AvatarBadge boxSize="20px" bg="green.500" />
        </Avatar>
      </Flex>
    </Flex>
  )
}

export default MainHeader
