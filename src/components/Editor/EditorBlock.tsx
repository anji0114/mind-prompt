import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import EditorJS from '@editorjs/editorjs'
import { EDITOR_TOOLS, I18N } from './EditorTools'
import { useStore } from '@/store'

const EditorBlock: FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const ref = useRef<EditorJS>()
  const note = useStore((state) => state.note)
  const setNote = useStore((state) => state.setNote)

  const initializeEditor = useCallback((data: any) => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        tools: EDITOR_TOOLS,
        placeholder: '入力する',
        data: data.content,
        i18n: I18N,

        async onChange(api, event) {
          const editorData = await api.saver.save()
          setNote({ ...data, content: editorData })
        },
      })

      ref.current = editor
    }
  }, [])

  useEffect(() => {
    if (note.id) {
      setIsMounted(true)
    }
  }, [note])

  useEffect(() => {
    if (isMounted) {
      initializeEditor(note)

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  return <div id="editor" className="prose"></div>
}

export default memo(EditorBlock)
