"use client"
import React from 'react'
import TableDocument from '../app/document/components/table-document'
import { ChakraProvider } from "@chakra-ui/react";

function page() {
  return (
    
    <ChakraProvider>
      <TableDocument  />
    </ChakraProvider>
    
  )
}export default page



