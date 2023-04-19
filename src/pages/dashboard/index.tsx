import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { DashBoardLayout } from '@/components/Dashboard/DashboardLayout'
import { DashboardNote } from '@/components/Dashboard/Note'

type Note = {
  id: string
  title: string
  content: string
  user_id: string
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

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  const { data: notesData } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })

  return {
    props: {
      user: session.user,
      notes: notesData,
    },
  }
}
