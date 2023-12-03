import { ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { Button, Modal, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  isOpen: boolean
  isLoading: boolean
  headerTitle: string
  buttonTitle: string
  children: ReactNode
  onClose: () => void
  onSubmit: () => void
}

function FormModal({ children, isLoading, isOpen, headerTitle, buttonTitle, onClose, onSubmit }: Props) {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={onSubmit}>
        <ModalHeader>{headerTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button type="submit" w="full" isLoading={isLoading}>
            {buttonTitle}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FormModal
