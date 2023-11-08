import { api } from '@/services/api'

interface Props {
  params: {
    id: string
  }
}

async function DocumentItem({ params: { id } }: Props) {
  const item = await api.getItem({ id })
  console.log(item)
  return null
}

export default DocumentItem
