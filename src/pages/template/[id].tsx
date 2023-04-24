import { TemplateDetail } from '@/components/Template/TemplateDetail'
import { useStore } from '@/store'
import { Note } from '@/types'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'

type Template = Note

const TemplateId: NextPage<{ template: Template }> = ({ template }) => {
  const setTemplate = useStore((state) => state.setEditNote)

  useEffect(() => {
    setTemplate(template)
  }, [])

  return <TemplateDetail />
}

export default TemplateId

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerSupabaseClient(context)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: templateData } = await supabase
    .from('templates')
    .select('*')
    .eq('id', context.query.id)
    .single()

  if (session?.user.id !== templateData?.user_id) {
    return {
      redirect: {
        destination: '/dashboard/template',
        permanent: false,
      },
    }
  }

  return {
    props: {
      template: templateData,
    },
  }
}
