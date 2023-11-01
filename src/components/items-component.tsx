'use client'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  List,
  ListItem,
  MenuItem,
  MenuItemOption,
  Stack,
} from '@chakra-ui/react'
import { useRouter, usePathname } from 'next/navigation'

interface ApiResponse {
  [key: string]: any
}
interface MyComponentProps {
  subItems: ApiResponse[]
  nameItem: string
  id: number
}

const ItemsComponent: React.FC<MyComponentProps> = ({ subItems, nameItem, id }) => {
  const defaultIndex = [1]
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Accordion
      defaultIndex={defaultIndex}
      allowMultiple
      backgroundColor={'white'}
      borderRadius={'8px'}
      position={'relative'}
    >
      <Box w="8px" h="100%" backgroundColor="#183b6b" position="absolute" left="0" top="0" borderRadius="8px 0 0 8px" />
      <AccordionItem borderRadius={'8px'}>
        <h2>
          <AccordionButton height={'68px'}>
            <Box as="span" flex="1" textAlign="left">
              {id}. {nameItem}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <List spacing={3}>
            {subItems.map((subItem, i) => (
              <ListItem
                w={'100%'}
                padding={'20px 24px 20px 24px'}
                borderRadius={'8px'}
                bgColor={'#EDF2F7'}
                _hover={{ backgroundColor: '#E9EBF8' }}
                textAlign={'left'}
                key={i}
                marginBottom={'7px'}
                onClick={() => router.push(`${pathname}/${subItem.id}`)}
              >
                {subItem.nombre}
              </ListItem>
            ))}
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
export default ItemsComponent
