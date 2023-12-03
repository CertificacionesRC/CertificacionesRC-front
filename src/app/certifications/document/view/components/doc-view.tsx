'use client'

import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import useSWR from 'swr'

const url = 'http://localhost:8081/api/registrocalificado/getDocumento?IdRegistroCalificado='

function DocView({ pdf }: { pdf: string }) {
  const { data } = useSWR(url + pdf, async (url) => {
    const response = await fetch(url)
    const blob = await response.blob()
    return URL.createObjectURL(blob)
  })

  // console.log(data)

  return (
    data && (
      <DocViewer
        pluginRenderers={DocViewerRenderers}
        requestHeaders={{
          'Access-Control-Allow-Origin': '*',
          mode: 'no-cors',
        }}
        documents={[
          {
            uri: 'http://localhost:8081/api/registrocalificado/getDocumento?IdRegistroCalificado=' + pdf,
          },
        ]}
      />
    )
  )
}

export default DocView
