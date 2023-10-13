'use client'
import React, { useRef } from 'react'
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react'

export default function EditorTiny() {
  const editorRef = useRef<TinyMCEEditor | null>(null)
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }
  return (
    <>
      <TinyMCEEditor
        onInit={(evt: any, editor: any) => {
          if (editorRef.current) {
            editorRef.current = editor
          }
        }}
        initialValue="<p>This is the initial content of the editor.</p>"
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
            'removeformat | help',
          content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
        }}
      />
    </>
  )
}
