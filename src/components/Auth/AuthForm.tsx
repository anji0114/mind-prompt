type Props = {
  handleSubmit: void
  isLogin: boolean
}

export const AuthForm = () => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formList}>
        <dl className={styles.formItem}>
          <dd className={styles.formTitle}>メールアドレス</dd>
          <dd className={styles.formArea}>
            <input
              type="text"
              placeholder="mail@example.com"
              required
              ref={emailRef}
            />
          </dd>
        </dl>
        <dl className={styles.formItem}>
          <dd className={styles.formTitle}>パスワード</dd>
          <dd className={styles.formArea}>
            <input type="password" required ref={passwordRef} />
          </dd>
        </dl>
      </div>
      <div className={styles.submitWrap}>
        <button className={`${styles.button} ${styles.isSubmit}`}>
          ログイン
        </button>
      </div>
    </form>
  )
}
