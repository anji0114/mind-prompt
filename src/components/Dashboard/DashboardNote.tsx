import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import {
  DocumentTextIcon,
  PlusIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline'
import { NoteItem } from '@/components/Dashboard/DashboardNoteItem'
import { DashboardHeading } from './DashboardHeading'

type Note = {
  id: string
  title: string
  content: string
  user_id: string
  created_at: string
}

type User = {
  id: string
}

type Props = {
  notes: Note[]
  user: User
}

export const DashboardNote: FC<Props> = () => {
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [notes, setNotes] = useState<Note[] | any>([])

  const handleCreateNote = async () => {
    const { data, error } = await supabase
      .from('notes')
      .insert({
        title: '新規ノート',
        content: { blocks: [] },
        user_id: user!.id,
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

      setNotes(data)
    }
    if (user?.id) {
      getNotes()
    }
  }, [user])

  return (
    <div className="min-h-screen">
      <DashboardHeading
        title="ノート管理"
        icon={<DocumentTextIcon className="w-[30px]" />}
      >
        <button className="flex items-center py-2.5 px-5 gap-2 rounded border border-[#222] hover:bg-[#f5f5f5]">
          <CommandLineIcon className="w-[18px] translate-y-[1px]" />
          <span className="text-sm inline-block">プロンプトから作成</span>
        </button>
        <button
          className="flex items-center py-2.5 px-5 gap-2 rounded bg-[#222] text-white hover:bg-[#555]"
          onClick={handleCreateNote}
        >
          <PlusIcon className="w-[18px] translate-y-[1px] " />
          <span className="text-sm inline-block">新規作成</span>
        </button>
      </DashboardHeading>

      <ul className="mt-8 space-y-[1px]">
        {notes?.map((note: Note) => (
          <NoteItem
            key={note.id}
            id={note.id}
            title={note.title}
            created_at={note.created_at}
          />
        ))}
      </ul>
    </div>
  )
}