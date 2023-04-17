import { NextPage } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { AuthLayout } from '@/components/Auth/AuthLayout'
import { AuthSignup } from '@/components/Auth/AuthSignup'

const Signup: NextPage = () => {
  return (
    <AuthLayout title="サインアップ">
      <AuthSignup />
    </AuthLayout>
  )
}

export default Signup

export const getServerSideProps = async (ctx: any) => {
  const supabase = createServerSupabaseClient(ctx)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
