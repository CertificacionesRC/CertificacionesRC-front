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
          nameItem="1. Denominación del programa"
          pathname={pathname}
        />

        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="2. Justificación del programa"
          pathname={pathname}
        />

        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="3. Aspectos curriculares"
          pathname={pathname}
        />

        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="4. Organización de actividades académicas y proceso formativo"
          pathname={pathname}
        />

        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="5. Investigación, innovación y/o creación artística y cultural"
          pathname={pathname}
        />

        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="6. Relación con el sector externo"
          pathname={pathname}
        />

        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="7. Profesores"
          pathname={pathname}
        />

        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="8. Medios educativos"
          pathname={pathname}
        />

        <ItemsComponent
          nameSubItems={['1. Subindice ', '2. Subindice ', '3. Subindice ']}
          nameItem="9. Infraestructura física y tecnológica"
          pathname={pathname}
        />
      </div>
    </>
  )
}

export default ItemPage
