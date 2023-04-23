import { NextPage } from 'next'
import { NoteDetail } from '@/components/Note/NoteDetail'
import { useStore } from '@/store'
import { Note } from '@/types'
import { useEffect } from 'react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const NoteId: NextPage<{ note: Note }> = ({ note }) => {
  const setEditNote = useStore((state) => state.setEditNote)

  useEffect(() => {
    setEditNote(note)
  }, [])

  return (
    <div className="min-h-screen">
      <NoteDetail />
    </div>
  )
}

export default NoteId

export const getServerSideProps = async (ctx: any) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: noteData } = await supabase
    .from('notes')
    .select('*')
    .eq('id', ctx.query.id)
    .single()

  if (session?.user.id !== noteData?.user_id) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: session?.user,
      note: noteData,
    },
  }
}
