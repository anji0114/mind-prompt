import { GetServerSideProps, NextPage } from 'next'
import { NoteDetail } from '@/components/Note/NoteDetail'
import { useStore } from '@/store'
import { useEffect } from 'react'
import useSWR from 'swr'
import { useUser } from '@supabase/auth-helpers-react'

const NoteId: NextPage<{ params: string }> = ({ params }) => {
  const setNote = useStore((state) => state.setNote)
  const user = useUser()
  const { data, error, isLoading } = useSWR(`/api/notes/${params}`)

  useEffect(() => {
    if (data !== undefined) {
      setNote(data)
    }
  }, [data])

  if (isLoading) {
    return (
      <div className=" h-screen flex justify-center items-center">
        ローディング中
      </div>
    )
  }

  if (error) {
    return (
      <div className=" h-screen flex justify-center items-center">
        エラーが発生しました
      </div>
    )
  }

  return <NoteDetail />
}

export default NoteId

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      params: context.query.id,
    },
  }
}
