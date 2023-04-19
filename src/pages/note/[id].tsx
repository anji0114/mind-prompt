import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextPage } from 'next'
import { NoteDetail } from '@/components/Note/NoteDetail'
import { useStore } from '@/store'
import { Note } from '@/types'
import { useEffect } from 'react'

const NoteId: NextPage<{ note: Note }> = ({ note }) => {
  const setEditNote = useStore((state) => state.setEditNote)

  useEffect(() => {
    setEditNote(note)
  }, [note])

  return (
    <div className="min-h-screen pb-10">
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

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  if (session.user.id !== noteData?.user_id) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: session.user,
      note: noteData,
    },
  }
}
