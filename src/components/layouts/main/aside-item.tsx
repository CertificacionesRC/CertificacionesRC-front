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
      as={Link}
      fontSize="18px"
      fontWeight="medium"
      href={href}
      isActive={isActive}
      justifyContent="flex-start"
      leftIcon={!isActive ? icon : activeIcon}
      variant="ghost"
      _active={{
        bg: 'primary.50',
      }}
    >
      {name}
    </Button>
  )
}

export default AsideMenuItem
