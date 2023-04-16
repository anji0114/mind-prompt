import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

import styles from '@/styles/Dashboard.module.scss'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Layout } from '@/components/Layout'

type User = {
  id: string
}

type note = {
  id: string
  title: string
  content: string
  user_id: string
}

const Dashboard: NextPage<{ user: User }> = ({ user }) => {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const [notes, setNotes] = useState<note[] | null>([])

  const handleCreateNote = async () => {
    const { data, error } = await supabase
      .from('notes')
      .insert({
        title: 'タイトル',
        content: '',
        user_id: user.id,
      })
      .select()

    if (error) {
      alert(error.message)
      return
    }

    router.push(`/note/${data[0].id}`)
  }

  const handleDeleteNote = async (id: string) => {
    const { error } = await supabase.from('notes').delete().eq('id', id)
    if (error) {
      alert(error.message)
      return
    }

    router.reload()
  }

  useEffect(() => {
    const getNotes = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)

      const convertedData = data!.map((note: { [x: string]: any }) => ({
        id: note.id,
        title: note.title,
        content: note.content,
        user_id: note.user_id,
      }))

      setNotes(convertedData)
    }

    getNotes()
  }, [user])

  return (
    <>
      <Layout>
        <div className={styles.inner}>
          <h2 className={styles.title}>ダッシュボード</h2>
          <button className={styles.createButton} onClick={handleCreateNote}>
            ノート作成
          </button>

          <ul className={styles.list}>
            {notes?.map((note) => (
              <li key={note.id} className={styles.item}>
                <Link href={`note/${note.id}`}>{note.title}</Link>
                <button
                  className={styles.delete}
                  onClick={() => handleDeleteNote(note.id)}
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    </>
  )
}

export default Dashboard

export const getServerSideProps = async (ctx: any) => {
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
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
