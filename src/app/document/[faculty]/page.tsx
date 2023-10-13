'use client'
import ItemsComponent from '@/components/items-component'
import { usePathname } from 'next/navigation'

function ItemPage() {
  const pathname = usePathname()
  return (
    <>
      <h2 style={{ fontWeight: '600', fontSize: '24px', lineHeight: '32px' }}>
        Condiciones de calidad programa de arquitectura
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="1. Indice"
          pathname={pathname}
        />

        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="2. Indice"
          pathname={pathname}
        />

        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="3. Indice"
          pathname={pathname}
        />

        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="4. Indice"
          pathname={pathname}
        />

        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="5. Indice"
          pathname={pathname}
        />

        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="6. Indice"
          pathname={pathname}
        />

        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="7. Indice"
          pathname={pathname}
        />

        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="8. Indice"
          pathname={pathname}
        />

        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="9. Indice"
          pathname={pathname}
        />
      </div>
    </>
  )
}

export default ItemPage
