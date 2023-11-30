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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={'50vw'}>
        <ModalHeader>Guía de ayuda</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text textAlign={'justify'}>{content}</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default ModalEditor
