import { NextPage } from 'next'
import { useEffect } from 'react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useStore } from '@/store'
import { Prompt } from '@/types'
import { PromptDetail } from '@/components/Prompt/PromptDetail'

const PromptId: NextPage<{ prompt: Prompt }> = ({ prompt }) => {
  const setPrompt = useStore((state) => state.setEditPrompt)

  useEffect(() => {
    setPrompt(prompt)
  })

  return (
    <div className="min-h-screen pb-10">
      <PromptDetail />
    </div>
  )
}

export default PromptId

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

  const { data: promptData } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', ctx.query.id)
    .single()

  if (session.user.id !== promptData?.user_id) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {
      prompt: promptData,
    },
  }
}
