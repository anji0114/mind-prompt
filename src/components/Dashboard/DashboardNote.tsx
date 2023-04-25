import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import useSWR from 'swr'
import {
  DocumentTextIcon,
  PlusIcon,
  SquaresPlusIcon,
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

export const DashboardNote: FC = () => {
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const { data, error, isLoading } = useSWR('/api/notes')

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

  return (
    <>
      <DashboardHeading
        title="ノート管理"
        icon={<DocumentTextIcon className="w-[30px]" />}
      >
        <button className="flex items-center py-2.5 px-5 gap-2 rounded border border-[#222] hover:bg-[#f5f5f5]">
          <SquaresPlusIcon className="w-[18px] translate-y-[1px]" />
          <span className="text-sm inline-block">テンプレートから作成</span>
        </button>
        <button
          className="flex items-center py-2.5 px-5 gap-2 rounded bg-[#222] text-white hover:bg-[#555]"
          onClick={handleCreateNote}
        >
          <PlusIcon className="w-[18px] translate-y-[1px] " />
          <span className="text-sm inline-block">新規作成</span>
        </button>
      </DashboardHeading>

      <div className="mt-8">
        {isLoading ? (
          <p className="text-center text-sm">ローディング</p>
        ) : error ? (
          <p className="text-center text-sm">
            エラーが発生しデータの取得に失敗しました。
          </p>
        ) : (
          <ul className="space-y-[1px]">
            {data?.map((note: Note) => (
              <NoteItem
                key={note.id}
                id={note.id}
                title={note.title}
                created_at={note.created_at}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
