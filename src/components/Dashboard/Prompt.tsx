import { Prompt } from '@/types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { CommandLineIcon, PlusIcon } from '@heroicons/react/24/outline'
import { PromptItem } from './PropmtItem'

type User = {
  id: string
}

type Props = {
  prompts: Prompt[]
  user: User
}

export const DashboardPrompt: FC<Props> = ({ prompts, user }) => {
  const supabase = useSupabaseClient()
  const router = useRouter()
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
      <div className="flex items-center justify-between py-[14px] px-5 border border-[#d0d7de] rounded-md bg-white">
        <h1 className="flex items-center gap-2.5">
          <CommandLineIcon className="w-8" />
          <span className="inline-block whitespace-nowrap pb-[1px]">
            プロンプト管理
          </span>
        </h1>
        <div className="flex items-center gap-3">
          <button
            className="flex items-center py-2.5 px-5 gap-2 rounded bg-[#222] text-white hover:bg-[#555]"
            onClick={handleCreatePrompt}
          >
            <PlusIcon className="w-[18px] translate-y-[1px] " />
            <span className="text-sm inline-block">新規作成</span>
          </button>
        </div>
      </div>

      <ul className="mt-8 space-y-[1px]">
        {prompts.map((prompt) => (
          <PromptItem
            key={prompt.id}
            id={prompt.id}
            title={prompt.title}
            content={prompt.content}
          />
        ))}
      </ul>
    </>
  )
}
