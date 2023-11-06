'use client'

import { IItem } from '@/utils/models'
import { useRouter, usePathname, useSearchParams, ReadonlyURLSearchParams } from 'next/navigation'
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card } from '@chakra-ui/react'
import SubItems from './sub-items'

function Item({ index, item }: { index: number; item: IItem }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleToggle = (index: number, searchParams: ReadonlyURLSearchParams) => {
    const createQueryString = (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (params.get('item') === String(index)) params.delete(name)
      else params.set(name, value)
      return params.toString()
    }

    const query = createQueryString('item', String(index))
    router.replace(pathname + '?' + query, {
      scroll: false,
    })
  }

  return (
    <Card overflow="hidden">
      <AccordionItem pl="2" position="relative" border="0">
        <AccordionButton textAlign="left" onClick={() => handleToggle(index, searchParams)}>
          {index + 1}. {item.name}
          <AccordionIcon ml="auto" />
        </AccordionButton>
        <AccordionPanel>
          <SubItems index={index} id={item.id} />
        </AccordionPanel>
        <Box position="absolute" left="0" insetY="0" w="2" bg="blue.500" />
      </AccordionItem>
    </Card>
  )
}

export default Item
