/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useToast } from '@chakra-ui/react'
import { UPDATE_SUBINDEX, UPDATE_INDEX } from '@/service/api'

type ApiResponse = Record<string, any>

const fetchUpdateItem = async (id: string, data: ApiResponse, item: boolean): Promise<any> => {
  const url = item ? UPDATE_INDEX : UPDATE_SUBINDEX
  return await fetch(url + `/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => await res.json())
}

export default function EditorTiny({ value, item }: { value: ApiResponse; item: boolean }) {
  const [body, setBody] = useState(value.contenido ?? '')
  const toast = useToast()

  useEffect(() => {
    setBody(value.contenido ?? '')
  }, [value.contenido])

  const updateSubItem = async (): Promise<void> => {
    try {
      let data
      if (body !== null) data = { contenido: body, nombre: value.nombre }
      else data = { nombre: value.nombre }

      const response: any = await fetchUpdateItem(value.id, data, item)

      toast({
        title: response.userMessage,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (err: any) {
      toast({
        title: err.userMessage,
        description: err.errorCode,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Editor
        id="1"
        apiKey="5vkptq5dwbqyxtlmn6jqt9nfglvidk82oigjm57ody4uytpg"
        initialValue={value.contenido ?? ''}
        value={body}
        onEditorChange={(newValue) => {
          setBody(newValue)
        }}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help| myCustomToolbarButton',
          content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
          // setup: (editor) => {
          //   editor.ui.registry.addButton('myCustomToolbarButton', {
          //     text: 'Guardar',
          //     onAction: () => updateSubItem(),
          //   })
          // },
        }}
      />
      <button
        onClick={() => {
          updateSubItem()
            .then(() => {})
            .catch(() => {})
        }}
      >
        Guardar
      </button>
    </>
  )
}
