import { NextPage } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Layout } from '@/components/Layout'
import { DashBoardLayout } from '@/components/Dashboard/Layout'
import { DashboardNote } from '@/components/Dashboard/Note'

type Note = {
  id: string
  title: string
  content: string
  user_id: string
  created_at: string
}

type User = {
  id: string
}

type Props = {
  notes: Note[]
  user: User
}
const Dashboard: NextPage<Props> = ({ notes, user }) => {
  return (
    <Layout>
      <DashBoardLayout>
        <DashboardNote notes={notes} user={user} />
      </DashBoardLayout>
    </Layout>
  )
}

export default Dashboard

export const getServerSideProps = async (ctx: any) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: notesData } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', session?.user.id)
    .order('created_at', { ascending: false })

  return {
    props: {
      user: session?.user,
      notes: notesData,
    },
  }
}
