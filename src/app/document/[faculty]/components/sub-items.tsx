'use client'

import { Accordion, List } from '@chakra-ui/react'
import { api } from '@/services/api'
import { useSearchParams } from 'next/navigation'
import SubItem from './sub-item'
import useSWR from 'swr'

function SubItems({ id, index }: { id: string; index: number }) {
  const searchParams = useSearchParams()
  const { data, error } = useSWR({ url: 'subitems', id }, (key) => {
    return api.getSubItems({
      id: key.id,
    })
  })

  if (error) return <span>Error</span>
  if (!data) return <span>Cargando...</span>

  const param = searchParams.get('subitem')
  const currentIndex = param ? [Number(param)] : []

  console.log(data)
  
  return (
    <Accordion index={currentIndex}>
      <List spacing="4">
        {data.map((subitem, subindex) => (
          <SubItem key={subitem.id} index={index} subindex={subindex} item={subitem} />
        ))}
      </List>
    </Accordion>
  )
}

export default SubItems
