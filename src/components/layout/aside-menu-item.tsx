/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface Props {
  name: string
  href: string
  icon: any
}

function AsideMenuItem({ name, icon, href }: Props) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Button isActive={isActive} as={Link} href={href} justifyContent="flex-start" variant="ghost" leftIcon={icon}>
      {name}
    </Button>
  )
}

export default AsideMenuItem
