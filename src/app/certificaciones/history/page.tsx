'use client'
import React from 'react'
import TableDocument from './components/table-document'
import { ChakraProvider } from '@chakra-ui/react'

function HistoryPage() {
  return (
    <ChakraProvider>
      <TableDocument />
    </ChakraProvider>
  )
}

export default HistoryPage
