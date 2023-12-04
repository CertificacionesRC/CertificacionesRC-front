'use client'

import { api } from '@/services/api'
import { Button, Flex, IconButton, Stack, Text, useDisclosure, useId, useToast } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react'
import { FiHelpCircle } from 'react-icons/fi'
import { FaRegCheckCircle } from 'react-icons/fa'
import { ISubItem } from '@/utils/models'
import { revalidate } from '@/utils/actions'
import { useRef, useState } from 'react'
import ModalEditor from './modal-editor'
import type { Editor as TinyMCEEditor } from 'tinymce'

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

export default function EditorSubitem({ subItem, help }: { subItem: ISubItem; help: string }) {
  const [isLoading, setIsLoading] = useState(true)
  const helpModal = useDisclosure()
  const editorRef = useRef<TinyMCEEditor>()
  const editorId = useId()
  const toast = useToast()

  const updateState = () => {
    api
      .updateStateSubItem({ id: subItem.id })
      .then(() => {
        toast({
          title: 'Estado cambiado',
          status: 'success',
        })
      })
      .catch((error) => {
        toast({
          title: error,
          status: 'error',
        })
      })
      .finally(() => {})
  }

  const updateContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent()
      api
        .updateContentSubItem({
          content,
          subItem,
        })
        .then(async () => {
          await revalidate('/document/subitem/[id]')
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
          {subItem.id}. {subItem.name}
        </Text>
        <Flex gap="10px" justifyContent="end">
          <IconButton aria-label="ayuda" title="ayuda" onClick={() => helpModal.onOpen()} icon={<FiHelpCircle />} />
          <IconButton aria-label="check" title="check" onClick={() => updateState()} icon={<FaRegCheckCircle />} />
          <Button isLoading={isLoading} onClick={updateContent}>
            Guardar
          </Button>
        </Flex>

        <Editor
          id={editorId}
          onLoadContent={() => setIsLoading(false)}
          onInit={(_, editor) => (editorRef.current = editor)}
          initialValue={subItem.content ?? initialData}
          apiKey={apiKey}
          init={tinySetup}
        />
      </Stack>
      <ModalEditor isOpen={helpModal.isOpen} onClose={helpModal.onClose} content={help} />
    </>
  )
}
