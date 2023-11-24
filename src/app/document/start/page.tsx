'use client'

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'

import { ROUTES } from '@/utils/routes'
import { useRouter } from 'next/navigation'

function DocumentStartPage() {
  const router = useRouter()

  const onSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault()
    router.replace(ROUTES.DOCUMENT_FACULTY('sistemas'))
  }

  return (
    <Center>
      <Card w="full" maxW="400px" p="4">
        <CardHeader textAlign="center">
          <Text fontSize="20px" fontWeight="400">
            Antes de continuar ayúdanos a completar el siguiente formulario
          </Text>
        </CardHeader>
        <CardBody>
          <Stack spacing="4" as="form" onSubmit={onSubmit}>
            <FormControl>
              <FormLabel>Facultad</FormLabel>
              <Input placeholder="Facultad de..." />
            </FormControl>
            <FormControl>
              <FormLabel>Tipo de programa</FormLabel>
              <Select>
                <option>Seleccionar</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Mes</FormLabel>
              <Select>
                <option>Seleccionar</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Elaborado por</FormLabel>
              <Input placeholder="Nombre del coordinador" />
            </FormControl>
            <FormControl>
              <FormLabel>Colaboradores</FormLabel>
              <Textarea placeholder="Nombre de los coordinadores" />
            </FormControl>
            <Button type="submit">Iniciar el documento</Button>
          </Stack>
        </CardBody>
      </Card>
    </Center>
  )
}

export default DocumentStartPage
