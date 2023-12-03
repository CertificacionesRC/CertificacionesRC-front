'use client'

import { Button, Card, CardBody, CardHeader, Center } from '@chakra-ui/react'
import { useState } from 'react'
import Form from '@/app/certifications/document/components/form'

const Layout = () => {
  const [isFormView, setIsFormView] = useState(false)

  if (isFormView) {
    return (
      <Center h="full">
        <Form />
      </Center>
    )
  }

  return (
    <Center h="full">
      <Card w="full" maxW="400px" textAlign="center">
        <CardHeader>
          Crea de manera dinámica y eficiente el documento de <strong>registro calificado</strong>
        </CardHeader>
        <CardBody>
          <Button onClick={() => setIsFormView(true)}>Crear registro calificado</Button>
        </CardBody>
      </Card>
    </Center>
  )
}
export default Layout
