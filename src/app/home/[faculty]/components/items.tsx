'use client'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  List,
  ListItem,
} from '@chakra-ui/react'

import { api } from '@/services/api'
import { ReadonlyURLSearchParams, useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ROUTES } from '@/utils/routes'
import Link from 'next/link'
import useSWR from 'swr'

function Items() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { data, error } = useSWR({ url: 'items' }, () => {
    return api.getItems()
  })

  if (error) return <span>Error</span>
  if (!data) return <span>Cargando...</span>

  const handleToggle = (path: string, index: number, searchParams: ReadonlyURLSearchParams) => {
    const createQueryString = (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (params.get(path) === String(index)) params.delete(name)
      else params.set(name, value)
      return params.toString()
    }

    const query = createQueryString(path, String(index))
    router.replace(pathname + '?' + query, {
      scroll: false,
    })
  }

  const param1 = searchParams.get('item')
  const currentIndex1 = param1 ? [Number(param1)] : []
  const param2 = searchParams.get('subitem')
  const currentIndex2 = param2 ? [Number(param2)] : []

  return (
    <Accordion index={currentIndex1}>
      <List spacing="4">
        {data.map((item, index) => (
          <Card overflow="hidden" key={item.id}>
            {item.subItems.length !== 0 ? (
              <AccordionItem pl="2" position="relative" border="0">
                <AccordionButton
                  textAlign="left"
                  onClick={() => {
                    handleToggle('item', index, searchParams)
                  }}
                >
                  {index + 1}. {item.name}
                  <AccordionIcon ml="auto" />
                </AccordionButton>
                <AccordionPanel>
                  <Accordion index={currentIndex2}>
                    <List spacing="4">
                      {item.subItems.map((subitem, subindex) =>
                        subitem.subItems.length !== 0 ? (
                          <AccordionItem key={subitem.id} overflow="hidden" border="0" rounded="md" bg="gray.100">
                            <AccordionButton
                              textAlign="left"
                              onClick={() => {
                                handleToggle('subitem', subindex, searchParams)
                              }}
                            >
                              {index + 1}.{subindex + 1} {subitem.name}
                              <AccordionIcon ml="auto" />
                            </AccordionButton>
                            <AccordionPanel>
                              <List spacing="4">
                                {subitem.subItems.map((deepItem, deepindex) => (
                                  <ListItem
                                    display="flex"
                                    rounded="md"
                                    bg="white"
                                    px="3"
                                    py="2"
                                    flex="1"
                                    key={deepItem.id}
                                    as={Link}
                                    href={ROUTES.DOCUMENT_SUBITEM(deepItem.id)}
                                  >
                                    {index + 1}.{subindex + 1}.{deepindex + 1} {deepItem.name}
                                  </ListItem>
                                ))}
                              </List>
                            </AccordionPanel>
                          </AccordionItem>
                        ) : (
                          <AccordionItem key={subitem.id} overflow="hidden" border="0" rounded="md" bg="gray.100">
                            <AccordionButton textAlign="left" as={Link} href={ROUTES.DOCUMENT_SUBITEM(subitem.id)}>
                              {index + 1}.{subindex + 1} {subitem.name}
                            </AccordionButton>
                          </AccordionItem>
                        )
                      )}
                    </List>
                  </Accordion>
                </AccordionPanel>
                <Box position="absolute" left="0" insetY="0" w="2" bg="blue.500" />
              </AccordionItem>
            ) : (
              <AccordionItem pl="2" position="relative" border="0">
                <AccordionButton textAlign="left" as={Link} href={ROUTES.DOCUMENT_ITEM(item.id)}>
                  {index + 1}. {item.name}
                </AccordionButton>
                <Box position="absolute" left="0" insetY="0" w="2" bg="blue.500" />
              </AccordionItem>
            )}
          </Card>
        ))}
      </List>
    </Accordion>
  )
}

export default Items
