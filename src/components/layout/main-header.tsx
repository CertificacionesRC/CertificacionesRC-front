import { Avatar, AvatarBadge, Box, Flex, Spacer } from '@chakra-ui/react'
import { BiHome, BiBell } from 'react-icons/bi'

function MainHeader() {
  return (
    <Flex flex="1" alignItems="center" gap="8" position="sticky" px="6" py="2" top="0">
      <Box fontSize="2xl">
        <BiHome />
      </Box>
      <Spacer />
      <Flex gap="8" alignItems="center">
        <Box fontSize="2xl">
          <BiBell />
        </Box>
        <Avatar name="GRT">
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
      </Flex>
    </Flex>
  )
}

export default MainHeader
