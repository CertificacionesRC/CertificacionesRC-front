'use client'

import { signOut } from '@/utils/actions'
import { ROUTES } from '@/utils/routes'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FiLogOut } from 'react-icons/fi'

function SignOut() {
  const router = useRouter()

  return (
    <Button justifyContent="flex-start" variant="ghost" leftIcon={<FiLogOut />} onClick={async () => {
      await signOut()
      router.replace(ROUTES.SIGNIN)
    }}>
      Cerrar session
    </Button>
  )
}

export default SignOut
