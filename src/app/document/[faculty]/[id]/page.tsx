import EditorTiny from '@/components/editor/editor-tiny'
import { GET_SUBINDEX_BY_ID } from '@/service/api'

const fetchGetSubIndexById = (id: string) => {
  return fetch(GET_SUBINDEX_BY_ID + `?idSubItem=${id}`, { cache: 'no-store' }).then((res) => res.json())
}

interface typeParams {
  [key: string]: string
}

async function EditorPage({ params }: { params: typeParams }) {
  const { id } = params
  const subIndex = await fetchGetSubIndexById(id)
  console.log(subIndex)
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
