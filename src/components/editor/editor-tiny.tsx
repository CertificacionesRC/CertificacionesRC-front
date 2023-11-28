'use client'

import { api } from '@/services/api'
import { Editor } from '@tinymce/tinymce-react'
import { Editor as TinyMCEEditor } from 'tinymce'
import { Button, Flex, IconButton, Stack, Text, useId, useToast } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { FiHelpCircle } from 'react-icons/fi'
import { IoMdCheckmark } from 'react-icons/io'

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

export default function EditorTiny({ id, content, name }: { id: string; content?: string; name?: string }) {
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
      <Text fontSize="2xl" fontWeight="bold" color="textColor">
        {id}. {name}
      </Text>
      <Flex gap="10px" justifyContent="end">
        <IconButton aria-label="check" title="check" variant="outline" icon={<IoMdCheckmark />} />
        <IconButton aria-label="ayuda" title="ayuda" variant="outline" icon={<FiHelpCircle />} />
        <Button variant="outline" isLoading={isLoading} onClick={updateContent}>
          Guardar
        </Button>
      </Flex>

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
