import Image from 'next/image'
import styles from './Header.module.scss'
import Link from 'next/link'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

export const Header = () => {
  const user = useUser()
  const router = useRouter()
  const supbase = useSupabaseClient()

  const logout = async () => {
    await supbase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          {!user ? (
            <Link href="/" className={styles.logo}>
              <Image
                src="/logo.svg"
                alt="Prompt Note"
                width={187}
                height={36}
              />
            </Link>
          ) : (
            <Link href="/dashboard" className={styles.logo}>
              <Image
                src="/logo.svg"
                alt="Prompt Note"
                width={187}
                height={36}
              />
            </Link>
          )}
          <div className={styles.links}>
            {!user ? (
              <>
                <Link href="/auth/login" className={styles.login}>
                  ログイン
                </Link>
                <Link href="/auth/signup" className={styles.signup}>
                  サインアップ
                </Link>
              </>
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
