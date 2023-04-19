import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import {
  DocumentTextIcon,
  PlusIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline'
import { NoteItem } from '@/components/Dashboard/NoteItem'

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
      <div className="flex items-center justify-between py-[14px] px-5 border border-[#d0d7de] rounded-md bg-white">
        <h2 className="flex items-center gap-2.5">
          <DocumentTextIcon className="w-[30px]" />
          <span className="inline-block whitespace-nowrap">ノート管理</span>
        </h2>
        <div className="flex items-center gap-3">
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
        </div>
      </div>

      <ul className="mt-8 space-y-[1px]">
        {notes?.map((note) => (
          <NoteItem key={note.id} id={note.id} title={note.title} />
        ))}
      </ul>
    </>
  )
}
