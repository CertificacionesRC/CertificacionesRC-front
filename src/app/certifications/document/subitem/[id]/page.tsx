import { api } from '@/services/api'
import EditorSubitem from '@/app/certifications/document/components/editor/editor-subitem'

interface Props {
  params: {
    id: string
  }
}

async function DocumentSubItem({ params: { id } }: Props) {
  const subItem = await api.getSubItem({ id })
  const guia = subItem.guide ?? ''

  return <EditorSubitem subItem={subItem} help={guia} />
}

export default DocumentSubItem
