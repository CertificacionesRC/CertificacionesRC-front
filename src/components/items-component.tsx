/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { GET_SUBINDEX_BY_INDEX } from '@/service/api'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, List } from '@chakra-ui/react'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import SubItemsComponent from './subItems-component'

type ApiResponse = Record<string, any>
interface MyComponentProps {
  nameItem: string
  id: number
}

const fetchGetItem = async (id: number) => {
  return await fetch(GET_SUBINDEX_BY_INDEX + `/${id}`, { cache: 'no-store' }).then(async (res) => await res.json())
}

const ItemsComponent: React.FC<MyComponentProps> = ({ nameItem, id }) => {
  const [subItems, setSubItems] = useState<ApiResponse[]>([])
  const defaultIndex = [1]
  const router = useRouter()
  const pathname = usePathname()
  const getItem = async () => {
    try {
      const response = await fetchGetItem(id)
      setSubItems(response)
    } catch (err) {
      setSubItems([])
    }
  }

  return (
    <>
      {id === 10 ? (
        <Box
          w={'100%'}
          padding={'20px 24px 20px 24px'}
          borderRadius={'8px'}
          bgColor={'white'}
          _hover={{ backgroundColor: '#E9EBF8' }}
          textAlign={'left'}
          marginBottom={'7px'}
          position={'relative'}
          onClick={() => {
            router.push(`${pathname}/item/${id}`)
          }}
        >
          <Box
            w="8px"
            h="100%"
            backgroundColor="#183b6b"
            position="absolute"
            left="0"
            top="0"
            borderRadius="8px 0 0 8px"
          />
          {id}. {nameItem}
        </Box>
      ) : (
        <Accordion
          defaultIndex={defaultIndex}
          allowMultiple
          backgroundColor={'white'}
          borderRadius={'8px'}
          position={'relative'}
        >
          <Box
            w="8px"
            h="100%"
            backgroundColor="#183b6b"
            position="absolute"
            left="0"
            top="0"
            borderRadius="8px 0 0 8px"
          />
          <AccordionItem borderRadius={'8px'}>
            <h2>
              <AccordionButton
                height={'68px'}
                onClick={async () => {
                  await getItem()
                }}
              >
                <Box as="span" flex="1" textAlign="left">
                  {id}. {nameItem}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List spacing={3}>
                {subItems.map((subItem, i) => (
                  <SubItemsComponent
                    key={i}
                    id={subItem.id}
                    name={subItem.nombre}
                    pathname={pathname}
                    router={router}
                  />
                ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </>
  )
}
export default ItemsComponent
