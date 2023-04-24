import { NextPage } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Prompt } from '@/types'
import { Layout } from '@/components/Layout'
import { DashBoardLayout } from '@/components/Dashboard/DashboardLayout'
import { DashboardPrompt } from '@/components/Dashboard/DashbordPrompt'

type User = {
  id: string
}

type Props = {
  prompts: Prompt[]
  user: User
}

const Prompt: NextPage<Props> = () => {
  return (
    <Layout>
      <DashBoardLayout>
        <DashboardPrompt />
      </DashBoardLayout>
    </Layout>
  )
}

export default Prompt
