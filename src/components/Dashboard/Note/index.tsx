import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { NoteItem } from '@/components/Note/NoteItem'
import styles from './DashBoardNote.module.scss'

type Note = {
  id: string
  title: string
  content: string
  user_id: string
}

export const DashboardNote = () => {
  const user = useUser()
  const supabase = useSupabaseClient()
  const router = useRouter()
  const [notes, setNotes] = useState<Note[] | null>([])

  const handleCreateNote = async () => {
    const { data, error } = await supabase
      .from('notes')
      .insert({
        title: '新規ノート',
        content: '',
        user_id: user?.id,
      })
      .select()
      .single()

    if (error) {
      alert(error.message)
      return
    }

    router.push(`/note/${data.id}`)
  }

  useEffect(() => {
    const getNotes = async () => {
      const { data } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (data === null) {
        return
      }
      const convertedData = data!.map((note: { [x: string]: any }) => ({
        id: note.id,
        title: note.title,
        content: note.content,
        user_id: note.user_id,
      }))

      setNotes(convertedData)
    }

    getNotes()
  }, [user])

  return (
    <>
      <div className={styles.heading}>
        <h2 className={styles.title}>
          <DocumentTextIcon />
          <span>ノート管理</span>
        </h2>
        <div className={styles.buttons}>
          <button className={styles.createButton} onClick={handleCreateNote}>
            ノート作成
          </button>
        </div>
      </div>

      <div className={styles.contents}></div>
      <ul className={styles.list}>
        {notes?.map((note) => (
          <NoteItem key={note.id} id={note.id} title={note.title} />
        ))}
      </ul>
    </>
  )
}
