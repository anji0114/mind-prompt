import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextPage } from 'next'
import { NoteDetail } from '@/components/Note/NoteDetail'
import { EditorLayout } from '@/components/Editor/EditorLayout'

type Note = {
  id: string
  title: string
  content: string
}

const NoteId: NextPage<{ note: Note }> = ({ note }) => {
  return (
    <EditorLayout>
      <NoteDetail note={note} />
    </EditorLayout>
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
