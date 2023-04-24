import { Prompt } from '@/types'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { CommandLineIcon, PlusIcon } from '@heroicons/react/24/outline'
import { PromptItem } from './DashbordPropmtItem'
import { DashboardHeading } from './DashboardHeading'

export const DashboardPrompt: FC = () => {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const user = useUser()
  const [prompts, setPrompts] = useState<Prompt[] | any>([])

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

  useEffect(() => {
    const getPrompts = async () => {
      const { data } = await supabase
        .from('prompts')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })
      setPrompts(data)
    }

    if (user?.id) {
      getPrompts()
    }
  }, [user])

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

      <ul className="mt-8 grid gap-[1px] grid-cols-2">
        {prompts.map((prompt: Prompt) => (
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
