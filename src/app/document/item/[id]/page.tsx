import { api } from '@/services/api'
import EditorTiny from '@/components/editor/editor-tiny'

interface Props {
  params: {
    id: string
  }
}

async function DocumentItem({ params: { id } }: Props) {
  const item = await api.getItem({ id })

  return <EditorTiny id={item.id} content={item.content} name={item.name} />
}

export default DocumentItem
