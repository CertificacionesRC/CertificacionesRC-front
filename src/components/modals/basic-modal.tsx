
"use client"
import React from 'react'
import {
    useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'


interface IModal {
    title: string
    children: React.ReactNode
    okButtonText: string
    okFunction: () => void
    secondaryButton?: boolean
    secondaryButtonText?: string
    secondaryFunction?: () => void

}

export const useModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    function openModal() {
        onOpen()
    }

    function closeModal() {
        onClose()
    }

    const BasicModal = ({ title, children, okButtonText, okFunction, secondaryButton = false, secondaryButtonText = '', secondaryFunction = () => { } }: IModal) => {
        return (
            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign='center'>{title}</ModalHeader>
                    <ModalBody>
                        {children}
                    </ModalBody>
                    <ModalFooter>
                        <Button width={!secondaryButton ? '100%' : 'auto'} colorScheme='blue' mr={3} onClick={okFunction}>
                            {okButtonText}
                        </Button>
                        {secondaryButton &&
                            <Button onClick={secondaryFunction} variant='ghost'>{secondaryButtonText}</Button>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    return [BasicModal, openModal, closeModal] as const;
}




