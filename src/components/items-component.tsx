import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button } from '@chakra-ui/react'

interface MyComponentProps {
  nameSubItems: string[]
  nameItem: string
}

const ItemsComponent: React.FC<MyComponentProps> = ({ nameSubItems, nameItem }) => {
  const defaultIndex = [1]

  return (
    <Accordion defaultIndex={defaultIndex} allowMultiple backgroundColor={'white'}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {nameItem}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {nameSubItems.map((nameSubItem, i) => (
            <Button w={'100%'} textAlign={'left'} key={i} marginBottom={'7px'}>
              {nameSubItem}
            </Button>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
export default ItemsComponent
