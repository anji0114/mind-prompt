import Link from 'next/link'
import styles from './Header.module.scss'

export const HeaderAuthButtons = () => {
  return (
    <>
      <Link href="/auth/login" className={styles.login}>
        ログイン
      </Link>
      <Link href="/auth/signup" className={styles.signup}>
        サインアップ
      </Link>
    </>
  )
}
