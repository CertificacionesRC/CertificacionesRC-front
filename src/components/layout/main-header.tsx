'use client'

import { Avatar, AvatarBadge, Flex, Icon, Spacer } from '@chakra-ui/react'
import { FiBell, FiHome } from 'react-icons/fi'

function MainHeader() {
  return (
    <Flex flex="1" alignItems="center" gap="4" px="4">
      <Icon fontSize="lg" as={FiHome} />
      <Spacer />
      <Flex gap="8" alignItems="center">
        <Icon fontSize="lg" as={FiBell} />
        <Avatar w="40px" h="40px" bg="blue.500" name="G">
          <AvatarBadge boxSize="20px" bg="green.500" />
        </Avatar>
      </Flex>
    </Flex>
  )
}

export default MainHeader
