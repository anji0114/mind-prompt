import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import {
  DocumentTextIcon,
  PlusIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline'
import { NoteItem } from '@/components/Note/NoteItem'
import styles from './DashboardNote.module.scss'

type Note = {
  id: string
  title: string
  content: string
  user_id: string
}

type User = {
  id: string
}

type Props = {
  notes: Note[]
  user: User
}

export const DashboardNote: FC<Props> = ({ notes, user }) => {
  const supabase = useSupabaseClient()
  const router = useRouter()

  const handleCreateNote = async () => {
    const { data, error } = await supabase
      .from('notes')
      .insert({
        title: '新規ノート',
        content: '',
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      alert(error.message)
      return
    }

    router.push(`/note/${data.id}`)
  }

  return (
    <>
      <div className={styles.heading}>
        <h2 className={styles.title}>
          <DocumentTextIcon />
          <span>ノート管理</span>
        </h2>
        <div className={styles.buttons}>
          <button className={styles.promptButton}>
            <CommandLineIcon />
            プロンプトから作成
          </button>
          <button className={styles.createButton} onClick={handleCreateNote}>
            <PlusIcon />
            新規作成
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
