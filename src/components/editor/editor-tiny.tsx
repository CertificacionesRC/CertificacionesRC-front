'use client'

import { api } from '@/services/api'
import { Editor } from '@tinymce/tinymce-react'
import { Editor as TinyMCEEditor } from 'tinymce'
import { Button, Stack, useId, useToast } from '@chakra-ui/react'
import { useRef, useState } from 'react'

const apiKey = 'ci3orvf7aeottyrtj86t4msks9v565y92jw8v2ve3qmodfc8'
const initialData = '<p>This is the initial content of the editor.</p>'

const tinySetup = {
  menubar: false,
  content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
  toolbar:
    'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help| myCustomToolbarButton',
}

export default function EditorTiny({ id, content }: { id: string; content?: string }) {
  const [isLoading, setIsLoading] = useState(true)
  const editorRef = useRef<TinyMCEEditor>()
  const editorId = useId()
  const toast = useToast()

  const updateContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent()
      setIsLoading(true)

      api
        .updateContentSubItem({
          content,
          id,
        })
        .then(() => {
          toast({
            title: 'Cambios guardados',
            status: 'success',
          })
        })
        .catch((error) => {
          toast({
            title: error,
            status: 'error',
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  return (
    <Stack position="relative" spacing="4">
      <Button colorScheme="blue" isLoading={isLoading} onClick={updateContent}>
        Actualizar contenido
      </Button>
      <Editor
        id={editorId}
        onLoadContent={() => setIsLoading(false)}
        onInit={(_, editor) => (editorRef.current = editor)}
        initialValue={content ?? initialData}
        apiKey={apiKey}
        init={tinySetup}
      />
    </Stack>
  )
}
