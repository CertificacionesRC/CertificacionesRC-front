'use client'

import { api } from '@/services/api'
import { List, ListItem } from '@chakra-ui/react'
import { ROUTES } from '@/utils/routes'
import Link from 'next/link'
import useSWR from 'swr'

function DeepItems({ id, index, subindex }: { id: string; index: number; subindex: number }) {
  const { data, error } = useSWR({ url: 'deepitems', id }, (key) => {
    return api.getDeepItems({
      id: key.id,
    })
  })

  if (error) return <span>Error</span>
  if (!data) return <span>Cargando...</span>

  return (
    <List spacing="4">
      {data.map((deepItem, deepindex) => (
        <ListItem
          display="flex"
          rounded="md"
          bg="white"
          key={deepItem.id}
          px="3"
          py="2"
          flex="1"
          as={Link}
          href={ROUTES.DOCUMENT_DEEP_ITEM(deepItem.id)}
        >
          {index + 1}.{subindex + 1}.{deepindex + 1} {deepItem.name}
        </ListItem>
      ))}
    </List>
  )
}

export default DeepItems
