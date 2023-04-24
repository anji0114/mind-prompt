import { useStore } from '@/store'
import TextareaAutosize from 'react-textarea-autosize'
import { EditorHeader } from '../Editor/EditorHeader'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const EditorBlock = dynamic(() => import('@/components/Editor/EditorBlock'), {
  ssr: false,
})

export const TemplateDetail = () => {
  const template = useStore((state) => state.editNote)
  const setTemplate = useStore((state) => state.setEditNote)
  const resetTemplate = useStore((state) => state.resetEditNote)
  const supabase = useSupabaseClient()
  const router = useRouter()

  const handleTemplateUpdate = async () => {
    const { error } = await supabase
      .from('templates')
      .update({
        title: template.title,
        content: template.content,
      })
      .eq('id', template.id)

    if (error) {
      alert(error.message)
      return
    }

    await router.push('/dashboard/template')
    resetTemplate()
  }

  return (
    <div className=" min-h-screen">
      <EditorHeader
        handleUpdate={handleTemplateUpdate}
        handleReset={resetTemplate}
        prevLink="/dashboard/template"
      />
      <div className="max-w-[660px] mx-auto mt-16">
        <h1>
          <TextareaAutosize
            value={template.title}
            minRows={1}
            placeholder="タイトル"
            className="w-full text-4xl font-bold outline-none resize-none"
            onChange={(e) => {
              setTemplate({ ...template, title: e.target.value })
            }}
          />
        </h1>
        <div className="mt-4">
          <EditorBlock />
        </div>
      </div>
    </div>
  )
}
