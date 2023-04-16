import { NextPage } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { AuthLayout } from '@/components/Auth/AuthLayout'
import { AuthLogin } from '@/components/Auth/AuthLogin'

const Login: NextPage = () => {
  return (
    <AuthLayout title="ログイン">
      <AuthLogin />
    </AuthLayout>
  )
}

export default Login

export const getServerSideProps = async (ctx: any) => {
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
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
