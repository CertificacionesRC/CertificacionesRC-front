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
  Text,
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
                  padding="24px 32px 24px 32px"
                  textAlign="left"
                  fontSize="20px"
                  fontWeight="semibold"
                  color="textColor"
                  as={Link}
                  href={ROUTES.DOCUMENT_ITEM(item.id)}
                >
                  <Box display="flex" gap="16px">
                    {' '}
                    <Text>{index + 1}.</Text> <Text>{item.name}</Text>
                  </Box>

                  <AccordionIcon
                    ml="auto"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleToggle('item', index, searchParams)
                    }}
                  />
                </AccordionButton>
                <AccordionPanel>
                  <Accordion index={currentIndex2}>
                    <List spacing="4">
                      {item.subItems.map((subitem, subindex) =>
                        subitem.subItems.length !== 0 ? (
                          <AccordionItem key={subitem.id} overflow="hidden" border="0" rounded="md" bg="gray.100">
                            <AccordionButton
                              padding="20px 24px 20px 24px"
                              textAlign="left"
                              color="textColor"
                              fontSize="18px"
                              onClick={() => {
                                handleToggle('subitem', subindex, searchParams)
                              }}
                            >
                              <Box display="flex" gap="16px">
                                {' '}
                                <Text fontWeight="semibold">
                                  {index + 1}.{subindex + 1}
                                </Text>{' '}
                                <Text fontWeight="medium">{subitem.name}</Text>
                              </Box>
                              <AccordionIcon ml="auto" />
                            </AccordionButton>
                            <AccordionPanel>
                              <List spacing="4">
                                {subitem.subItems.map((deepItem, deepindex) => (
                                  <ListItem
                                    display="flex"
                                    rounded="md"
                                    bg="white"
                                    padding="16px 20px 16px 20px"
                                    flex="1"
                                    key={deepItem.id}
                                    as={Link}
                                    href={ROUTES.DOCUMENT_SUBITEM(deepItem.id)}
                                    color="textColor"
                                    fontSize="16px"
                                  >
                                    <Box display="flex" gap="16px">
                                      {' '}
                                      <Text fontWeight="semibold">
                                        {index + 1}.{subindex + 1}.{deepindex + 1}
                                      </Text>{' '}
                                      <Text fontWeight="medium">{deepItem.name}</Text>
                                    </Box>
                                  </ListItem>
                                ))}
                              </List>
                            </AccordionPanel>
                          </AccordionItem>
                        ) : (
                          <AccordionItem key={subitem.id} overflow="hidden" border="0" rounded="md" bg="gray.100">
                            <AccordionButton
                              textAlign="left"
                              as={Link}
                              href={ROUTES.DOCUMENT_SUBITEM(subitem.id)}
                              padding="20px 24px 20px 24px"
                              color="textColor"
                              fontSize="18px"
                            >
                              <Box display="flex" gap="16px">
                                {' '}
                                <Text fontWeight="semibold">
                                  {index + 1}.{subindex + 1}
                                </Text>{' '}
                                <Text fontWeight="medium">{subitem.name}</Text>
                              </Box>
                            </AccordionButton>
                          </AccordionItem>
                        )
                      )}
                    </List>
                  </Accordion>
                </AccordionPanel>
                <Box position="absolute" left="0" insetY="0" w="2" bg="primary" />
              </AccordionItem>
            ) : (
              <AccordionItem pl="2" position="relative" border="0">
                <AccordionButton
                  padding="24px 32px 24px 32px"
                  textAlign="left"
                  fontSize="20px"
                  fontWeight="600"
                  as={Link}
                  href={ROUTES.DOCUMENT_ITEM(item.id)}
                >
                  {index + 1}. {item.name}
                </AccordionButton>
                <Box position="absolute" left="0" insetY="0" w="2" bg="primary" />
              </AccordionItem>
            )}
          </Card>
        ))}
      </List>
    </Accordion>
  )
}

export default Items
