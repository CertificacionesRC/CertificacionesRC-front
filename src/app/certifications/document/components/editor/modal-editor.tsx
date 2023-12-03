import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  content: string
  onClose: () => void
}
function ModalEditor({ content, isOpen, onClose }: Props) {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={'50vw'}>
        <ModalHeader>Guía de ayuda</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text textAlign={'justify'}>{content || 'Desconocido'}</Text>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default ModalEditor
