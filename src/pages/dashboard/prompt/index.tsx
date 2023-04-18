import { DashBoardLayout } from '@/components/Dashboard/DashboardLayout'
import { Layout } from '@/components/Layout'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Prompt = {
  id: string
  title: string
  content: string
}

const DashboardPrompt: NextPage<{ prompts: Prompt[] }> = ({ prompts }) => {
  const user = useUser()
  const supabase = useSupabaseClient()
  const router = useRouter()

  const handleCreatePrompt = async () => {
    const { data, error } = await supabase
      .from('prompts')
      .insert({
        title: '新規プロンプト',
        content: '',
        description: '',
        user_id: user?.id,
      })
      .select()
      .single()

    if (error) {
      alert(error.message)
      return
    }

    router.push(`/prompt/${data.id}`)
  }

  return (
    <div>
      <Layout>
        <DashBoardLayout>
          <div className="heading">
            <h1>プロンプトかんり</h1>
            <button onClick={handleCreatePrompt}>新規作成</button>
          </div>
          <ul className="list">
            {prompts.map((prompt) => (
              <li className="item" key={prompt.id}>
                <p>2002年1月14日</p>
                <h2>
                  <Link href={`/prompt/${prompt.id}`}>{prompt.title}</Link>
                </h2>
                <p>説明がき</p>
              </li>
            ))}
          </ul>
        </DashBoardLayout>
      </Layout>
    </div>
  )
}

export default DashboardPrompt

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
    },
  }
}
