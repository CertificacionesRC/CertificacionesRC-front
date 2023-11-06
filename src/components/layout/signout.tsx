'use client'

import { signOut } from '@/utils/actions'
import { Button } from '@chakra-ui/react'
import { FiLogOut } from 'react-icons/fi'

function SignOut() {
  return (
    <Button justifyContent="flex-start" variant="ghost" leftIcon={<FiLogOut />} onClick={() => signOut()}>
      Cerrar session
    </Button>
  )
}

export default SignOut
