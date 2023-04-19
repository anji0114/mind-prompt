import { FC, ReactNode } from 'react'
import { Header } from '../Header'
import styles from './EditorLayout.module.scss'

export const EditorLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.main}>
        <div className={styles.container}>{children}</div>
      </div>
    </div>
  )
}
