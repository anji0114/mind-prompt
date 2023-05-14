import { FC } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import TextareaAutosize from 'react-textarea-autosize'
import { useStore } from '@/store'
import { EditorHeader } from '@/components/Editor/EditorHeader'

const EditorBlock = dynamic(() => import('@/components/Editor/EditorBlock'), {
  ssr: false,
})

export const NoteDetail: FC = () => {
  const supabase = useSupabaseClient()
  const router = useRouter()

  const note = useStore((state) => state.note)
  const setNote = useStore((state) => state.setNote)
  const resetNote = useStore((state) => state.resetNote)

  const handleNoteUpdate = async () => {
    const { error } = await supabase
      .from('notes')
      .update({
        title: note.title,
        content: note.content,
      })
      .eq('id', note.id)

    if (error) {
      alert(error.message)
      return
    }

    await router.push('/dashboard')
    resetNote()
  }

  return (
    <>
      <EditorHeader
        handleUpdate={handleNoteUpdate}
        handleReset={resetNote}
        prevLink="/dashboard"
      />
      <div className="max-w-[660px] mx-auto mt-16">
        <h1>
          <TextareaAutosize
            value={note.title}
            minRows={1}
            placeholder="タイトル"
            className="w-full text-4xl font-bold outline-none resize-none"
            onChange={(e) => {
              setNote({ ...note, title: e.target.value })
            }}
          />
        </h1>
        <div className="mt-4">
          <EditorBlock />
        </div>
      </div>
    </>
  )
}
