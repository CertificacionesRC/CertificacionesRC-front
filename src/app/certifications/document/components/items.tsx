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
import { FaCircleCheck } from 'react-icons/fa6'
import Link from 'next/link'
import useSWR from 'swr'

function Items() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { data, error } = useSWR(
    { url: 'items' },
    () => {
      return api.getItems()
    },
    { revalidateOnFocus: true, revalidateOnReconnect: true, revalidateIfStale: true }
  )

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
                  _hover={{ bg: 'transparent' }}
                  onClick={() => {
                    router.push(ROUTES.DOCUMENT_ITEM(item.id))
                  }}
                >
                  <Box display="flex" gap="16px">
                    <Text>{index + 1}.</Text> <Text>{item.name}</Text>
                  </Box>
                  {item.state === 'Completado' && (
                    <Box marginLeft={8} color="#5BAE40">
                      <FaCircleCheck />
                    </Box>
                  )}

                  <AccordionIcon
                    ml="auto"
                    bg="gray.200"
                    rounded="full"
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
                              fontSize="18px"
                              _hover={{ bg: 'transparent' }}
                              onClick={() => {
                                handleToggle('subitem', subindex, searchParams)
                              }}
                            >
                              <Box display="flex" gap="16px">
                                <Text fontWeight="semibold">
                                  {index + 1}.{subindex + 1}
                                </Text>
                                <Text fontWeight="medium">{subitem.name}</Text>
                              </Box>
                              {subitem.state === 'Completado' && (
                                <Box marginLeft={8} color="#5BAE40">
                                  <FaCircleCheck />
                                </Box>
                              )}
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
                                      <Text fontWeight="semibold">
                                        {index + 1}.{subindex + 1}.{deepindex + 1}
                                      </Text>
                                      <Text fontWeight="medium">{deepItem.name}</Text>
                                    </Box>
                                    {deepItem.state === 'Completado' && (
                                      <Box marginLeft={8} color="#5BAE40">
                                        <FaCircleCheck />
                                      </Box>
                                    )}
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
                                <Text fontWeight="semibold">
                                  {index + 1}.{subindex + 1}
                                </Text>
                                <Text fontWeight="medium">{subitem.name}</Text>
                              </Box>
                              {subitem.state === 'Completado' && (
                                <Box marginLeft={8} color="#5BAE40">
                                  <FaCircleCheck />
                                </Box>
                              )}
                            </AccordionButton>
                          </AccordionItem>
                        )
                      )}
                    </List>
                  </Accordion>
                </AccordionPanel>
                <Box position="absolute" left="0" insetY="0" w="2" bg="primary.500" />
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
                  {item.state === 'Completado' && (
                    <Box marginLeft={8} color="#5BAE40">
                      <FaCircleCheck />
                    </Box>
                  )}
                </AccordionButton>

                <Box position="absolute" left="0" insetY="0" w="2" bg="primary.500" />
              </AccordionItem>
            )}
          </Card>
        ))}
      </List>
    </Accordion>
  )
}

export default Items
