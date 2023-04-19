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
    <div className={styles.inner}>
      <h1 className={styles.title}>
        <TextareaAutosize
          value={title}
          minRows={1}
          placeholder="タイトル"
          onChange={(e) => {
            setTitle(() => e.target.value)
          }}
        />
      </h1>
      <div className={styles.content}>
        <TextareaAutosize
          value={content}
          onChange={(e) => {
            setContent(() => e.target.value)
          }}
          minRows={6}
          placeholder="入力する"
        />
      </div>
      <p className={styles.button}>
        <button onClick={handleNoteUpdate}>保存する</button>
      </p>
    </div>
  )
}
