'use client'
import { IQualifiedRegistration } from '@/utils/models'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useState } from 'react'

type ChangeStateFunction = (params: {
  certificate: IQualifiedRegistration | null
  content: string
  state: string
}) => Promise<void>

interface Props {
  isOpen: boolean
  onClose: () => void
  observation: string
  changeState: ChangeStateFunction
  certificado: IQualifiedRegistration | null
}
function ModalComments({ isOpen, onClose, observation, changeState, certificado }: Props) {
  const [comments, setComments] = useState(observation)

  const handleSubmmit = () => {
    changeState({ content: comments, certificate: certificado, state: certificado?.status ?? 'PorAprobar' })
  }
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={'50vw'}>
        <ModalHeader>Comentarios</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input value={comments} onChange={(e) => setComments(e.target.value)}></Input>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={() => handleSubmmit()}>
            Agregar cometarios
          </Button>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default ModalComments
