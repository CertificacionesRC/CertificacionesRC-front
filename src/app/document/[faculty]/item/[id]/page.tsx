import EditorTiny from '@/components/editor/editor-tiny'
import { GET_INDEX_BY_ID } from '@/service/api'

const fetchGetIndexById = async (id: string) => {
  const url = GET_INDEX_BY_ID + `?idItem=${id}`

  return await fetch(url, {
    cache: 'no-store',
  })
    .then(async (res) => await res.json())
    .catch(() => {})
    .finally(() => {})
}

type typeParams = Record<string, string>

async function EditorPageItem({ params }: { params: typeParams }) {
  const { id } = params
  const item = await fetchGetIndexById(id)

  return (
    <>
      <h2 style={{ fontWeight: '600', fontSize: '24px', lineHeight: '32px' }}>{item.data.nombre}</h2>
      <div style={{ marginTop: '30px' }}>
        <EditorTiny value={item.data} item={true} />
      </div>
    </>
  )
}

export default EditorPageItem
