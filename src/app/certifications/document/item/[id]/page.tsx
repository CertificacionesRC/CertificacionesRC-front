import { api } from '@/services/api'
import EditorItem from '@/app/certifications/document/components/editor/editor-item'

interface Props {
  params: {
    id: string
  }
}

async function DocumentItem({ params: { id } }: Props) {
  const item = await api.getItem({ id })
  const guia = item.guide ?? ''

  return <EditorItem item={item} help={guia} />
}

export default DocumentItem
