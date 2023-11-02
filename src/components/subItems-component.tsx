/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { GET_SUBINDEX_BY_PARENTID } from '@/service/api'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  List,
  ListItem,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type ApiResponse = Record<string, any>
const fetchGetSubItem = async (id: any) => {
  return await fetch(GET_SUBINDEX_BY_PARENTID + `?parentId=${id}`, { cache: 'no-store' }).then(
    async (res) => await res.json()
  )
}
const SubItemsComponent = ({ name, id, pathname, router }: { name: any; id: any; pathname: any; router: any }) => {
  const defaultIndex = [1]
  const [subItems, setSubItems] = useState<ApiResponse[]>([])

  const getSubItem = async (id: any) => {
    try {
      const response = await fetchGetSubItem(id)
      setSubItems(response.data)
    } catch (err) {
      setSubItems([])
    }
  }
  useEffect(() => {
    getSubItem(id)
  }, [id])

  return (
    <>
      {subItems.length === 0 ? (
        <ListItem
          w={'100%'}
          padding={'20px 24px 20px 24px'}
          borderRadius={'8px'}
          bgColor={'#EDF2F7'}
          _hover={{ backgroundColor: '#E9EBF8' }}
          textAlign={'left'}
          marginBottom={'7px'}
          onClick={() => router.push(`${pathname}/${id}`)}
        >
          {name}
        </ListItem>
      ) : (
        <Accordion defaultIndex={defaultIndex} allowMultiple backgroundColor={'#EDF2F7'} borderRadius={'8px'}>
          <AccordionItem borderRadius={'8px'}>
            <h2>
              <AccordionButton height={'68px'}>
                <Box as="span" flex="1" textAlign="left">
                  {name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List spacing={3}>
                {subItems.map((sub: ApiResponse, i: number) => (
                  <ListItem
                    w={'100%'}
                    padding={'20px 24px 20px 24px'}
                    borderRadius={'8px'}
                    bgColor={'#b7c2d1'}
                    _hover={{ backgroundColor: '#E9EBF8' }}
                    textAlign={'left'}
                    key={i}
                    marginBottom={'7px'}
                    onClick={() => router.push(`${pathname}/${sub.id}`)}
                  >
                    {sub.nombre}
                  </ListItem>
                ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </>
  )
}
export default SubItemsComponent
