'use client'

import { api } from '@/services/api'
import { Button, Flex, IconButton, Stack, Text, useDisclosure, useId, useToast } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react'
import { FiHelpCircle } from 'react-icons/fi'
import { revalidate } from '@/utils/actions'
import { useRef, useState } from 'react'
import ModalEditor from './modal-editor'
import type { Editor as TinyMCEEditor } from 'tinymce'
import { IItem } from '@/utils/models'

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

export default function EditorItem({ item, help }: { item: IItem; help: string }) {
  const [isLoading, setIsLoading] = useState(true)
  const helpModal = useDisclosure()
  const editorRef = useRef<TinyMCEEditor>()
  const editorId = useId()
  const toast = useToast()

  const updateContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent()
      api
        .updateContentItem({
          content,
          id: item.id,
        })
        .then(async () => {
          await revalidate('/document?item=0')
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
    <>
      <Stack position="relative" spacing="4">
        <Text fontSize="2xl" fontWeight="bold" color="textColor">
          {item.id}. {item.name}
        </Text>
        <Flex gap="10px" justifyContent="end">
          <IconButton aria-label="ayuda" title="ayuda" onClick={() => helpModal.onOpen()} icon={<FiHelpCircle />} />
          <Button isLoading={isLoading} onClick={updateContent}>
            Guardar
          </Button>
        </Flex>

        <Editor
          id={editorId}
          onLoadContent={() => setIsLoading(false)}
          onInit={(_, editor) => (editorRef.current = editor)}
          initialValue={item.content ?? initialData}
          apiKey={apiKey}
          init={tinySetup}
        />
      </Stack>
      <ModalEditor isOpen={helpModal.isOpen} onClose={helpModal.onClose} content={help} />
    </>
  )
}
