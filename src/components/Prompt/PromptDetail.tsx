import { useStore } from '@/store'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import TextareaAutosize from 'react-textarea-autosize'
import { EditorHeader } from '../Editor/Header'

export const PromptDetail = () => {
  const supabase = useSupabaseClient()
  const router = useRouter()

  const prompt = useStore((state) => state.editPrompt)
  const setPrompt = useStore((state) => state.setEditPrompt)

  const handlePromptUpdate = async () => {
    const { error } = await supabase
      .from('prompts')
      .update({
        title: prompt.title,
        content: prompt.content,
      })
      .eq('id', prompt.id)

    if (error) {
      alert(error.message)
      return
    }

    router.push('/dashboard/prompt')
  }

  return (
    <>
      <EditorHeader
        handleUpdate={handlePromptUpdate}
        prevLink="/dashboard/prompt"
      />
      <div className="max-w-[800px] mx-auto mt-16">
        <h1>
          <TextareaAutosize
            value={prompt.title}
            minRows={1}
            placeholder="タイトル"
            className=" w-full text-3xl pb-5 outline-none resize-none border-b border-[#d0d7de]"
            required
            onChange={(e) => {
              setPrompt({ ...prompt, title: e.target.value })
            }}
          ></TextareaAutosize>
        </h1>

        <div className="mt-7">
          <TextareaAutosize
            value={prompt.content}
            onChange={(e) => {
              setPrompt({ ...prompt, content: e.target.value })
            }}
            minRows={6}
            placeholder="入力する"
            className=" w-full py-2.5 px-1 outline-none leading-8 resize-none"
          ></TextareaAutosize>
        </div>
      </div>
    </>
  )
}
