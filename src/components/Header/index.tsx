import Image from 'next/image'
import styles from './Header.module.scss'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <Image src="/logo.svg" alt="Prompt Note" width={187} height={36} />
          </Link>
          <div className={styles.links}>
            <Link href="/auth/login" className={styles.login}>
              ログイン
            </Link>
            <Link href="/auth/signup" className={styles.signup}>
              サインアップ
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
