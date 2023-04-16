import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import styles from './Header.module.scss'
import { HeaderAuthButtons } from './HeaderAuthButtons'

export const Header = () => {
  const user = useUser()
  const supbase = useSupabaseClient()
  const router = useRouter()

  const logout = async () => {
    await supbase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.inner}>
          
          <Link href={!user ? '/' : '/dashboard'} className={styles.logo}>
            <Image src="/logo.svg" alt="Prompt Note" width={187} height={36} />
          </Link>
          <div className={styles.links}>
            {!user ? (
              <HeaderAuthButtons />
            ) : (
              <button className={styles.logout} onClick={logout}>
                ログアウト
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
