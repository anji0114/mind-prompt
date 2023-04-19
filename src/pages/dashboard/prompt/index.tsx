import { NextPage } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Prompt } from '@/types'
import { Layout } from '@/components/Layout'
import { DashBoardLayout } from '@/components/Dashboard/Layout'
import { DashboardPrompt } from '@/components/Dashboard/Prompt'

type User = {
  id: string
}

type Props = {
  prompts: Prompt[]
  user: User
}

const Prompt: NextPage<Props> = ({ prompts, user }) => {
  return (
    <Layout>
      <DashBoardLayout>
        <DashboardPrompt prompts={prompts} user={user} />
      </DashBoardLayout>
    </Layout>
  )
}

export default Prompt

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

  const { data: promptsData } = await supabase
    .from('prompts')
    .select('*')
    .eq('user_id', session.user?.id)
    .order('created_at', { ascending: false })

  return {
    props: {
      prompts: promptsData,
      user: session.user,
    },
  }
}
