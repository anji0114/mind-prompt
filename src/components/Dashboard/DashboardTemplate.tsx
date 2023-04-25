import { DashboardHeading } from './DashboardHeading'
import { PlusIcon, SquaresPlusIcon } from '@heroicons/react/24/outline'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Note } from '@/types'
import { TemplateItem } from './DashboardTemplateItem'
import { OutputData } from '@editorjs/editorjs'
import useSWR from 'swr'
import { useRouter } from 'next/router'

export const DashboardTemplate = () => {
  const router = useRouter()
  const user = useUser()
  const supabase = useSupabaseClient()

  const { data, error, isLoading } = useSWR('/api/templates')

  const handleCreateTemplate = async () => {
    const { data, error } = await supabase
      .from('templates')
      .insert({
        title: '新規テンプレート',
        content: { blocks: [] },
        user_id: user!.id,
      })
      .select()
      .single()

    if (error) {
      alert(error.message)
      return
    }

    router.push(`/template/${data.id}`)
  }

  return (
    <div>
      <DashboardHeading
        title="テンプレート管理"
        icon={<SquaresPlusIcon className="w-8" />}
      >
        <button
          className="flex items-center py-2.5 px-5 gap-2 rounded bg-[#222] text-white hover:bg-[#555]"
          onClick={handleCreateTemplate}
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
            {data?.map(
              (
                template: Note & { created_at: string } & {
                  content: OutputData
                }
              ) => (
                <TemplateItem
                  key={template.id}
                  title={template.title}
                  id={template.id}
                  content={template.content}
                  created_at={template.created_at}
                />
              )
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
