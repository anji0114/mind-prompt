import { FC, ReactNode } from 'react'
import { DashboardNav } from './Nav'
import styles from '@/components/Dashboard/Layout.module.scss'

type Props = {
  children: ReactNode
}

export const DashBoardLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.grid}>
      <aside className={styles.aside}>
        <DashboardNav />
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
