import { FormEvent, useEffect, useRef } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import styles from '@/styles/Auth.module.scss'
import { useRouter } from 'next/router'

const signup = () => {
  const supabase = useSupabaseClient()
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/')
  }, [user])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      }
    )

    if (signUpError) {
      alert(signUpError.message)
      return
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .update({ name: nameRef.current!.value })
      .eq('id', signUpData.user!.id)

    if (profileError) {
      alert(profileError.message)
      return
    }

    router.push('/dashboard')
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
                    <input
                      type="text"
                      placeholder="タロー"
                      ref={nameRef}
                      required
                    />
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
