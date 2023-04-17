import Link from 'next/link'
import Image from 'next/image'
import styles from '@/components/Home/Mv/HomeMv.module.scss'
import { useUser } from '@supabase/auth-helpers-react'

export const HomeMv = () => {
  const user = useUser()

  return (
    <div className={styles.wrap}>
      <div className={styles.contents}>
        <div className={styles.image}>
          <Image src="/logo.svg" alt="Prompt Note" width={300} height={70} />
        </div>
        <p className={styles.text}>
          もう手作りノートに悩まない！
          <span>PromptNoteで自分流のノートをスマートに作成！</span>
        </p>
        <div className={styles.links}>
          {user ? (
            <Link className={styles.link} href="/dashboard">
              ダッシュボード
            </Link>
          ) : (
            <Link className={styles.link} href="/auth/signup">
              サインアップ
            </Link>
          )}
          <Link
            className={styles.link}
            href="https://github.com/anji0114/prompt-note"
            target="_blank"
          >
            GitHub
          </Link>
        </div>
      </div>
    </div>
  )
}
