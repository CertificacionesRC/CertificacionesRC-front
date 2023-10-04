'use client'

import { BiHome } from 'react-icons/bi'
import { Button } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface Props {
  name: string
  href: string
}

function AsideMenuItem({ name, href }: Props) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Button isActive={isActive} as={Link} href={href} variant="aside" leftIcon={<BiHome />}>
      {name}
    </Button>
  )
}

export default AsideMenuItem
