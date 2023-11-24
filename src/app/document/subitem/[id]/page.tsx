import EditorTiny from '@/components/editor/editor-tiny'
import { api } from '@/services/api'

interface Props {
  params: {
    id: string
  }
}

async function DocumentSubItem({ params: { id } }: Props) {
  const subItem = await api.getSubItem({ id })

  return <EditorTiny id={subItem.id} content={subItem.content} name={subItem.name} />
}

export default DocumentSubItem
