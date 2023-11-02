import { Card, CardHeader, CardBody, Button } from '@chakra-ui/react'
import FormModal from '../../../components/modals/form-modal'

function StartDocument() {
  const [FormModalComponent, openModal] = FormModal()

  return (
    <Card textAlign="center">
      <CardHeader>
        Crea de manera dinámica y eficiente el documento <br />
        de <strong>registro calificado</strong>
      </CardHeader>
      <CardBody>
        <Button colorScheme="blue" onClick={openModal}>
          Iniciar documento
        </Button>
      </CardBody>
      <FormModalComponent />
    </Card>
  )
}

export default StartDocument
