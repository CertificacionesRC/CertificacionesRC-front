import EditorTiny from '@/components/editor/editor-tiny'
import { GET_SUBINDEX_BY_ID } from '@/service/api'

const fetchGetSubIndexById = async (id: string) => {
  return await fetch(GET_SUBINDEX_BY_ID + `?idSubItem=${id}`, { cache: 'no-store' }).then(
    async (res) => await res.json()
  )
}

type typeParams = Record<string, string>

async function EditorPage({ params }: { params: typeParams }) {
  const { id } = params
  const subIndex = await fetchGetSubIndexById(id)

  return (
    <>
      <h2 style={{ fontWeight: '600', fontSize: '24px', lineHeight: '32px' }}>{subIndex.data.nombre}</h2>
      <div style={{ marginTop: '30px' }}>
        <EditorTiny value={subIndex.data} item={false} />
      </div>
    </>
  )
}

export default EditorPage
