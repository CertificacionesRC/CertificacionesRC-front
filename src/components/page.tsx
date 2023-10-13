"use client"
import React from 'react'
import {Center} from '@chakra-ui/react'
import StartDocument from '../app/document/components/start-document'

function page() {
  return (
    <Center h="calc(100vh - 70px)">
      <StartDocument/>
    </Center>
  )
}export default page
