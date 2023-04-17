import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import styles from '@/styles/NoteDetail.module.scss'
import { Layout } from '@/components/Layout'

const NoteDetail: NextPage = () => {
  const [id, setId] = useState<string | undefined>()
  const [title, setTitle] = useState<string | undefined>()
  const [content, setContent] = useState<string | undefined>()
  const supabase = useSupabaseClient()
  const router = useRouter()

  const handleNoteUpdate = async () => {
    const { data, error } = await supabase
      .from('notes')
      .update({
        title: title,
        content: content,
      })
      .eq('id', id)

    if (error) {
      alert(error.message)
      return
    }
    router.push('/dashboard')
  }

  useEffect(() => {
    const getNote = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', router.query.id)
        .single()

      setId(data?.id)
      setTitle(data?.title)
      setContent(data?.content)
    }
    getNote()
  }, [supabase])

  return (
    <>
      <Layout>
        <div className={styles.inner}>
          <h1 className={styles.title}>
            <TextareaAutosize
              value={title}
              minRows={1}
              placeholder="タイトル"
              onChange={(e) => {
                setTitle(() => e.target.value)
              }}
            />
          </h1>
          <div className={styles.content}>
            <TextareaAutosize
              value={content}
              onChange={(e) => {
                setContent(() => e.target.value)
              }}
              minRows={6}
              placeholder="入力する"
            />
          </div>
          <p className={styles.button}>
            <button onClick={handleNoteUpdate}>保存する</button>
          </p>
        </div>
      </Layout>
    </>
  )
}

export default NoteDetail

export const getServerSideProps = async (ctx: any) => {
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
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
