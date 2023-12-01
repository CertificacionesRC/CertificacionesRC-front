/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface Props {
  name: string
  href: string
  icon: any
  activeIcon: any
}

function AsideMenuItem({ name, icon, activeIcon, href }: Props) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Button
      isActive={isActive}
      as={Link}
      href={href}
      justifyContent="flex-start"
      variant="ghost"
      leftIcon={!isActive ? icon : activeIcon}
      fontSize="18px"
      fontWeight="medium"
    >
      {name}
    </Button>
  )
}

export default AsideMenuItem
