import { IMAGE_PATHS } from '@/utils/constants'
import { Center, Heading, Stack } from '@chakra-ui/react'
import Image from 'next/image'

function HomePage() {
  return (
    <Center h="full">
      <Stack alignItems="center" spacing="4">
        <Heading as="h1">Bienvenido a Registro Calificado</Heading>
        <Image alt="landing background" width={300} height={279.75} src={IMAGE_PATHS.BACKGROUNDS.HOME} />
      </Stack>
    </Center>
  )
}

export default HomePage
