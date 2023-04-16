import { FC, ReactNode } from 'react'
import { Header } from '../Header'
import { Footer } from '../Footer'
import styles from '@/components/Auth/AuthLayout.module.scss'

type Props = {
  children: ReactNode
  title: 'ログイン' | 'サインアップ'
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles.contents}>
            <h2 className={styles.heading}>{title}</h2>
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
