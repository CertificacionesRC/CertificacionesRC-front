'use client'

import { Accordion, List } from '@chakra-ui/react'
import { api } from '@/services/api'
import { useSearchParams } from 'next/navigation'
import Item from './item'
import useSWR from 'swr'

function Items() {
  const searchParams = useSearchParams()
  const { data, error } = useSWR({ url: 'items' }, () => {
    return api.getItems()
  })

  if (error) return <span>Error</span>
  if (!data) return <span>Cargando...</span>

  const param = searchParams.get('item')
  const currentIndex = param ? [Number(param)] : []

  return (
    <Accordion index={currentIndex}>
      <List spacing="4">
        {data.map((item, index) => (
          <Item key={item.id} index={index} item={item} />
        ))}
      </List>
    </Accordion>
  )
}

export default Items
