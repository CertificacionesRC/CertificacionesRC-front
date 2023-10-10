import React from 'react'
import { useModal } from './basic-modal'
import {
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack
} from '@chakra-ui/react'

export default function FormModal() {
    const [BasicModal, openModal, closeModal] = useModal()

    const FormModalComponent = () => (
        <BasicModal okFunction={() => { }} okButtonText='Iniciar el documento' title='Antes de continuar ayudanos a completar el siguiente formulario'>
            <FormControl>
                <Stack mb={5} spacing={2}>
                    <FormLabel>Facultad</FormLabel>
                    <Input placeholder='Facultad de...' />
                </Stack>
                <Stack mb={5} spacing={2}>
                    <FormLabel>Tipo de programa</FormLabel>
                    <Select>
                        <option>Seleccionar</option>
                    </Select>
                </Stack>
                <Stack mb={5} spacing={2}>
                    <FormLabel>Mes</FormLabel>
                    <Input type="datetime-local" />
                </Stack>
                <FormLabel>Elaborado por</FormLabel>
                <Input placeholder='Nombre del coordinador' />
            </FormControl>
        </BasicModal>
    )

    return [FormModalComponent, openModal, closeModal] as const;

}
