import EditorTiny from '@/components/editor/editor-tiny'

function EditorPage() {
  return (
    <>
      <h2 style={{ fontWeight: '600', fontSize: '24px', lineHeight: '32px' }}>1.1 Información básica del programa</h2>
      <div style={{ marginTop: '30px' }}>
        <EditorTiny />
      </div>
    </>
  )
}

export default EditorPage
