import { NextPage } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Layout } from '@/components/Layout'
import { DashBoardLayout } from '@/components/Dashboard/DashboardLayout'
import { DashboardNote } from '@/components/Dashboard/DashboardNote'

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
const Dashboard: NextPage<Props> = () => {
  return (
    <Layout>
      <DashBoardLayout>
        <DashboardNote />
      </DashBoardLayout>
    </Layout>
  )
}

export default Dashboard
