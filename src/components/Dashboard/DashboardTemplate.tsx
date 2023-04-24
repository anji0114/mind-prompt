import React, { useEffect, useState } from 'react'
import { DashboardHeading } from './DashboardHeading'
import { PlusIcon, SquaresPlusIcon } from '@heroicons/react/24/outline'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Note } from '@/types'
import { TemplateItem } from './DashboardTemplateItem'

export const DashboardTemplate = () => {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [templates, setTemplates] = useState<Note[] | any>([])

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

    alert('success')
  }

  useEffect(() => {
    const getTemplates = async () => {
      const { data } = await supabase
        .from('templates')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      setTemplates(data)
    }

    if (user?.id) {
      getTemplates()
    }
  }, [user])

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
      <ul className="mt-8 space-y-[1px]">
        {templates.map((template: Note & { created_at: string }) => (
          <TemplateItem
            key={template.id}
            title={template.title}
            id={template.id}
            created_at={template.created_at}
          />
        ))}
      </ul>
    </div>
  )
}
