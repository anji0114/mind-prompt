import { Prompt } from '@/types'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { CommandLineIcon, PlusIcon } from '@heroicons/react/24/outline'
import { PromptItem } from './DashbordPropmtItem'
import { DashboardHeading } from './DashboardHeading'

export const DashboardPrompt: FC = () => {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const user = useUser()
  const { data, error, isLoading } = useSWR('/api/prompts')

  const handleCreatePrompt = async () => {
    const { data, error } = await supabase
      .from('prompts')
      .insert({
        title: '新規プロンプト',
        content: '',
        description: '',
        user_id: user!.id,
      })
      .select()
      .single()

    if (error) {
      alert(error.message)
      return
    }

    router.push(`/prompt/${data.id}`)
  }

  return (
    <>
      <DashboardHeading
        title="プロンプト管理"
        icon={<CommandLineIcon className="w-8" />}
      >
        <button
          className="flex items-center py-2.5 px-5 gap-2 rounded bg-[#222] text-white hover:bg-[#555]"
          onClick={handleCreatePrompt}
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
          <ul className="grid gap-[1px] grid-cols-2">
            {data?.map((prompt: Prompt) => (
              <PromptItem
                key={prompt.id}
                id={prompt.id}
                title={prompt.title}
                content={prompt.content}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
