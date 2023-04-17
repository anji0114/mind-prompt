import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { DashBoardLayout } from '@/components/Dashboard/DashboardLayout'
import { DashboardNote } from '@/components/Dashboard/Note'

const Dashboard: NextPage = () => {
  return (
    <Layout>
      <DashBoardLayout>
        <DashboardNote />
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

  if (!session)
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }

  return {
    props: {
      user: session.user,
    },
  }
}
