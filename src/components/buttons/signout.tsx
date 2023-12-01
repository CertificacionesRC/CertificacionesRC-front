'use client'

import { removeAuthCookies } from '@/utils/actions'
import { ROUTES } from '@/utils/routes'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FiLogOut } from 'react-icons/fi'

function SignOut() {
  const router = useRouter()

  return (
    <Button
      justifyContent="flex-start"
      variant="ghost"
      leftIcon={<FiLogOut />}
      onClick={async () => {
        await removeAuthCookies()
        router.replace(ROUTES.SIGNIN)
      }}
    >
      Cerrar sesión
    </Button>
  )
}

export default SignOut
