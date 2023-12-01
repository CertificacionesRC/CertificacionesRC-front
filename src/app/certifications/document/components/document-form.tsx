'use client'

import { Button, Card, CardBody, Text } from '@chakra-ui/react'
import { useState } from 'react'
import DocumentCreate from '@/app/certifications/document/components/document-create'

const DocumentForm = () => {
  const [isFormView, setIsFormView] = useState(false)

  if (isFormView) {
    return <DocumentCreate />
  }

  return (
    <Card w="full" maxW="400px" textAlign="center">
      <CardBody>
        <Text>
          Crea de manera dinámica y eficiente el documento de <strong>registro calificado</strong>
        </Text>
        <Button onClick={() => setIsFormView(true)}>Crear registro calificado</Button>
      </CardBody>
    </Card>
  )
}
export default DocumentForm
