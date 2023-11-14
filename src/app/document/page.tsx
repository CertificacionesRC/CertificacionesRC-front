'use client'
import React from 'react'
import TableDocument from './components/table-document'
import { ChakraProvider } from '@chakra-ui/react'

function DocumentPage() {
  return (
    <ChakraProvider>
      <TableDocument />
    </ChakraProvider>
  )
}

export default DocumentPage
