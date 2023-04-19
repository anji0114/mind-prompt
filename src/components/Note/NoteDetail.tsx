import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import styles from '@/components/Note/NoteDetail.module.scss'
import { useStore } from '@/store'

type Props = {
  id: string
  title: string
  content: string
}
export const NoteDetail: FC<{ note: Props }> = ({ note }) => {
  const [id, setId] = useState<string | undefined>()
  const [title, setTitle] = useState<string | undefined>()
  const [content, setContent] = useState<string | undefined>()
  const supabase = useSupabaseClient()
  const router = useRouter()

  const handleNoteUpdate = async () => {
    const { error } = await supabase
      .from('notes')
      .update({
        title: title,
        content: content,
      })
      .eq('id', id)

    if (error) {
      alert(error.message)
      return
    }

    router.push('/dashboard')
  }

  useEffect(() => {
    setId(note.id)
    setTitle(note.title)
    setContent(note.content)
  }, [note])

  return (
    <div className="max-w-[800px] mx-auto">
      <h1>
        <TextareaAutosize
          value={title}
          minRows={1}
          placeholder="タイトル"
          className=" w-full text-3xl pb-5 outline-none resize-none border-b border-[#d0d7de]"
          onChange={(e) => {
            setTitle(() => e.target.value)
          }}
        />
      </h1>
      <div className="mt-7">
        <TextareaAutosize
          value={content}
          onChange={(e) => {
            setContent(() => e.target.value)
          }}
          minRows={6}
          placeholder="入力する"
          className=" w-full py-2.5 px-1 outline-none leading-8 resize-none"
        />
      </div>
      <p className="mt-14 text-center">
        <button
          onClick={handleNoteUpdate}
          className="inline-block py-3 px-10 text-white bg-[#222] rounded hover:bg-[#555]"
        >
          保存する
        </button>
      </p>
    </div>
  )
}
