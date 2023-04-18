import { Layout } from '@/components/Layout'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

type Prompt = {
  id: string
  title: string
  content: string
}

const PromptId: NextPage<{ prompt: Prompt }> = ({ prompt }) => {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const [id, setId] = useState<string | undefined>()
  const [title, setTitle] = useState<string | undefined>()
  const [content, setContent] = useState<string | undefined>()

  const handlePromptUpdate = async () => {
    const { error } = await supabase
      .from('prompts')
      .update({
        title: title,
        content: content,
      })
      .eq('id', id)
    if (error) {
      alert(error.message)
      return
    }

    router.push('/dashboard/prompt')
  }

  useEffect(() => {
    setId(prompt.id)
    setTitle(prompt.title)
    setContent(prompt.content)
  }, [])

  return (
    <Layout>
      <div className="prompt">
        <TextareaAutosize
          value={title}
          minRows={1}
          placeholder="タイトル"
          onChange={(e) => {
            setTitle(() => e.target.value)
          }}
        ></TextareaAutosize>
        内容
        <TextareaAutosize
          value={content}
          minRows={4}
          placeholder="コンテント"
          onChange={(e) => {
            setContent(() => e.target.value)
          }}
        ></TextareaAutosize>
        <button onClick={handlePromptUpdate}>保存する</button>
      </div>
    </Layout>
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
      user: session.user,
      prompt: promptData,
    },
  }
}
