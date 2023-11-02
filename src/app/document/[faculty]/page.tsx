import ItemsComponent from '@/components/items-component'
import { GET_ALL_INDEX, GET_ALL_SUBINDEX } from '@/service/api'
import { filterObjectsById } from '@/utils/filters'

const fetchGetIndex = () => {
  return fetch(GET_ALL_INDEX, { cache: 'no-store' }).then((res) => res.json())
}

export default async function ItemPage() {
  interface ApiResponse {
    [key: string]: any
  }
  const indexs = await fetchGetIndex()
  return (
    <>
      <h2 style={{ fontWeight: '600', fontSize: '24px', lineHeight: '32px' }}>
        Condiciones de calidad programa de arquitectura
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        {indexs.map((index: ApiResponse, i: number) => (
          <ItemsComponent key={i} nameItem={index.nombre} id={index.id} />
        ))}
      </div>
    </>
  )
}
