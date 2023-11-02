/* eslint-disable @typescript-eslint/no-explicit-any */
import ItemsComponent from '@/components/items-component'
import { GET_ALL_INDEX } from '@/service/api'

const fetchGetIndex = async () => {
  return await fetch(GET_ALL_INDEX, { cache: 'no-store' }).then(async (res) => await res.json())
}

export default async function ItemPage() {
  type ApiResponse = Record<string, any>
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
