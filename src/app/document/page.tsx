'use client'
import React from 'react'
import CertificateHistory from './components/certificate-history'
import { ChakraProvider } from '@chakra-ui/react'

function DocumentPage() {
  return (
    <ChakraProvider>
      <CertificateHistory />
    </ChakraProvider>
  )
}

export default DocumentPage
