import { FormEvent, useRef } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import styles from '@/styles/Auth.module.scss'

const signup = () => {
  const supabase = useSupabaseClient()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    })

    if (error) {
      alert(error.message)
      return
    }

    alert('success')
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.contents}>
            <h2 className={styles.heading}>サインアップ</h2>
            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.formList}>
                <dl className={styles.formItem}>
                  <dd className={styles.formTitle}>ユーザーネーム</dd>
                  <dd className={styles.formArea}>
                    <input type="text" />
                  </dd>
                </dl>
                <dl className={styles.formItem}>
                  <dd className={styles.formTitle}>メールアドレス</dd>
                  <dd className={styles.formArea}>
                    <input
                      type="text"
                      placeholder="mail@example.com"
                      ref={emailRef}
                      required
                    />
                  </dd>
                </dl>
                <dl className={styles.formItem}>
                  <dd className={styles.formTitle}>パスワード</dd>
                  <dd className={styles.formArea}>
                    <input type="password" ref={passwordRef} required />
                  </dd>
                </dl>
              </div>
              <div className={styles.submitWrap}>
                <button className={`${styles.button} ${styles.isSubmit}`}>
                  サインアップ
                </button>
              </div>
            </form>
            <div className={styles.linkWrap}>
              <Link href="/auth/login">ログインはこちらから</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default signup
