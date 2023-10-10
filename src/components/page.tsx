"use client"
import React from 'react'
import FormModal from './modals/form-modal'
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  Center,
  Heading,
  Button
} from '@chakra-ui/react'
function page() {
  const [FormModalComponent, openModal, closeModal] = FormModal()
  return (
    <Center h="calc(100vh - 70px)">
      <Box w={["100%", "70%", "50%"]} height='30%' textAlign='center' backgroundColor='#fff' p={10} justifyContent='space-between' display='flex' flexDirection='column' >
        <Heading as='h4' size='md'>
          Crea de manera dinamica y eficiente el documento de registo calificado
        </Heading>
        <Button onClick={openModal}>Iniciar el documento</Button>
      </Box>

      <FormModalComponent />
    </Center>
  )
}

export default page
